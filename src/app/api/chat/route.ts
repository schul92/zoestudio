import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '@/lib/chatKnowledge'

/**
 * Site chatbot. Streams a reply from Claude, grounded only in
 * src/lib/chatKnowledge.ts — the bot has no tools and no database.
 *
 * Two models are in play deliberately:
 *   - CHAT_MODEL (Haiku 4.5) answers visitors. FAQ-shaped work at ~1c/conversation.
 *   - Fable 5 is what we author the knowledge base and prompt with, not what runs here.
 * Swapping CHAT_MODEL is the only change needed to trade cost for depth.
 */
const CHAT_MODEL = 'claude-haiku-4-5'

const MAX_TOKENS = 600 // a chat bubble, not an essay
const MAX_TURNS = 24 // ~12 exchanges; past that, ask them to email
const MAX_CHARS = 2000 // per user message

// Per-IP rate limit. In-memory, so it resets on cold start and is per-instance —
// enough to stop a bored visitor from burning tokens, not a security boundary.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 12
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // crude bound on memory growth
  return recent.length > MAX_PER_WINDOW
}

// Owner-mandated budget guard. Worst case per message on Haiku is ~$0.006
// (≈3K in + 600 out), so the daily cap bounds spend at ~$1.50/day (~$45/mo)
// even if every message maxes out; the per-IP day cap stops any one visitor
// from eating the whole allowance. Same in-memory/no-DB tradeoff as above:
// per-instance and reset on cold start, so the real ceiling is a bit higher —
// a cost fuse, not accounting. When either cap trips, visitors get a
// courteous handoff to email/KakaoTalk instead of an error.
const DAILY_MESSAGE_CAP = 250
const DAILY_IP_CAP = 40
let dayStamp = ''
let dayCount = 0
const dayByIp = new Map<string, number>()

function overBudget(ip: string): boolean {
  const today = new Date().toISOString().slice(0, 10)
  if (today !== dayStamp) {
    dayStamp = today
    dayCount = 0
    dayByIp.clear()
  }
  const ipCount = (dayByIp.get(ip) ?? 0) + 1
  dayByIp.set(ip, ipCount)
  dayCount += 1
  return dayCount > DAILY_MESSAGE_CAP || ipCount > DAILY_IP_CAP
}

type Turn = { role: 'user' | 'assistant'; content: string }

function validate(messages: unknown): Turn[] | null {
  if (!Array.isArray(messages) || messages.length === 0) return null
  if (messages.length > MAX_TURNS) return null
  const out: Turn[] = []
  for (const m of messages) {
    if (typeof m !== 'object' || m === null) return null
    const { role, content } = m as Record<string, unknown>
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const text = content.trim()
    if (!text || text.length > MAX_CHARS) return null
    out.push({ role, content: text })
  }
  // Claude requires the conversation to start with a user turn.
  if (out[0].role !== 'user') return null
  return out
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Fail loudly in logs, softly to the visitor.
    console.error('[chat] ANTHROPIC_API_KEY is not set')
    return Response.json(
      { error: 'Chat is temporarily unavailable. Please email info@zoelumos.com.' },
      { status: 503 }
    )
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many messages. Please wait a moment.' },
      { status: 429 }
    )
  }

  if (overBudget(ip)) {
    return Response.json(
      {
        error:
          '오늘 상담량이 많아 AI 응답을 잠시 쉬어갑니다. info@zoelumos.com 또는 카카오톡으로 문의해 주세요. / The assistant is resting for today — please email info@zoelumos.com.',
      },
      { status: 429 }
    )
  }

  let messages: Turn[] | null
  try {
    const body = await request.json()
    messages = validate(body?.messages)
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (!messages) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })

  try {
    const stream = client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: MAX_TOKENS,
      // cache_control on the system prompt. NOTE: this is currently a no-op —
      // Haiku 4.5 only caches prefixes of 4096+ tokens and ours is ~2.2K, so
      // nothing is written and nothing is read (silently, by design in the API).
      // Left in deliberately: padding the knowledge base to reach the threshold
      // would cost more than it saves (~0.4c per conversation at this size), but
      // if CHAT_MODEL moves to a larger model — Opus 5 caches from 512 tokens,
      // Sonnet 5 from 1024 — caching starts working with no code change.
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    })

    const encoder = new TextEncoder()
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } catch (err) {
          console.error('[chat] stream error', err)
          controller.enqueue(
            encoder.encode(
              '\n\nSorry — something went wrong. Please email info@zoelumos.com.'
            )
          )
        } finally {
          controller.close()
        }
      },
    })

    return new Response(body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    // Typed SDK errors so a 429 from Anthropic isn't reported as our bug.
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: 'Busy right now. Please try again in a moment.' },
        { status: 429 }
      )
    }
    if (err instanceof Anthropic.APIError) {
      console.error('[chat] Anthropic API error', err.status, err.message)
    } else {
      console.error('[chat] unexpected error', err)
    }
    return Response.json(
      { error: 'Chat is temporarily unavailable. Please email info@zoelumos.com.' },
      { status: 502 }
    )
  }
}
