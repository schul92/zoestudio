import 'server-only'
import nodemailer from 'nodemailer'
import { fmtUSD } from './services'

/**
 * Billing notification emails.
 *
 * Stripe only emails receipts in live mode, and only when "Customer emails" is
 * enabled in the dashboard. We send our own bilingual confirmation regardless,
 * so the client always hears from ZOE LUMOS (not just from Stripe), and so the
 * owner is copied on money events. Reuses the same Gmail SMTP credentials the
 * contact form uses.
 *
 * Never throws: a failed email must not make Stripe retry a webhook it already
 * processed successfully.
 */

const OWNER_INBOXES = 'zoestudiollc@gmail.com, steve.b.song92@gmail.com'
const KAKAO_URL = 'http://pf.kakao.com/_xhxdxmlX/chat'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function transport() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!user || !pass) return null
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  })
}

async function send(opts: { to: string; subject: string; html: string; text: string }) {
  const t = transport()
  if (!t) {
    console.warn('[billing.email] EMAIL_USER/EMAIL_PASS not set — skipping', opts.subject)
    return
  }
  try {
    await t.sendMail({
      from: `"ZOE LUMOS" <${process.env.EMAIL_USER}>`,
      ...opts,
    })
  } catch (err) {
    console.error('[billing.email] send failed:', err instanceof Error ? err.message : err)
  }
}

const shell = (body: string) => `
  <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#151414">
    <div style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#b48a43">ZOE LUMOS</div>
    ${body}
    <hr style="border:none;border-top:1px solid #eee;margin:28px 0">
    <p style="font-size:13px;color:#777;line-height:1.7">
      문의사항은 <a href="${KAKAO_URL}" style="color:#b48a43">카카오톡</a> 또는
      <a href="mailto:info@zoelumos.com" style="color:#b48a43">info@zoelumos.com</a> 으로 연락 주세요.<br>
      <span style="color:#999">Questions? Reach us on KakaoTalk or at info@zoelumos.com.</span>
    </p>
  </div>`

/** Sent to the client when a subscription payment succeeds. */
export async function sendPaymentConfirmation(args: {
  to: string
  clientName: string
  amountCents: number
  invoiceUrl: string | null
  testMode: boolean
}) {
  const { to, clientName, amountCents, invoiceUrl, testMode } = args
  const amount = fmtUSD(amountCents)
  const name = escapeHtml(clientName)
  const banner = testMode
    ? '<p style="background:#fff3cd;color:#7a5b00;padding:10px 12px;border-radius:6px;font-size:13px">TEST MODE — 실제 결제가 아닙니다 / no real payment was taken.</p>'
    : ''

  await send({
    to,
    subject: `결제가 완료되었습니다 — ${amount} / Payment received — ${amount}`,
    text: `${clientName}님, ${amount} 결제가 정상 처리되었습니다.\n\n${invoiceUrl ? `영수증: ${invoiceUrl}\n\n` : ''}ZOE LUMOS`,
    html: shell(`
      ${banner}
      <h1 style="font-size:22px;font-weight:600;margin:18px 0 6px">결제가 완료되었습니다</h1>
      <p style="color:#777;margin:0 0 22px">Payment received</p>
      <p style="line-height:1.8">
        <strong>${name}</strong> 님,<br>
        월 정기 결제 <strong style="color:#b48a43">${amount}</strong> 이 정상 처리되었습니다.
      </p>
      ${invoiceUrl ? `<p style="margin:24px 0"><a href="${invoiceUrl}" style="background:#151414;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">영수증 보기 / View receipt</a></p>` : ''}
    `),
  })
}

/** Sent to the client when a payment fails, and to us so we can chase it. */
export async function sendPaymentFailed(args: {
  to: string | null
  clientName: string
  amountCents: number
  invoiceUrl: string | null
  attempt: number
}) {
  const { to, clientName, amountCents, invoiceUrl, attempt } = args
  const amount = fmtUSD(amountCents)
  const name = escapeHtml(clientName)

  if (to) {
    await send({
      to,
      subject: `결제가 처리되지 않았습니다 — ${amount} / Payment failed`,
      text: `${clientName}님, ${amount} 결제가 처리되지 않았습니다. 결제 수단을 확인해 주세요.${invoiceUrl ? `\n\n${invoiceUrl}` : ''}`,
      html: shell(`
        <h1 style="font-size:22px;font-weight:600;margin:18px 0 6px">결제가 처리되지 않았습니다</h1>
        <p style="color:#777;margin:0 0 22px">We couldn't process your payment</p>
        <p style="line-height:1.8">
          <strong>${name}</strong> 님,<br>
          <strong style="color:#c0392b">${amount}</strong> 결제가 실패했습니다. 카드 한도나 유효기간을 확인해 주세요.<br>
          <span style="color:#999">Please check your card or bank details. We will retry automatically.</span>
        </p>
        ${invoiceUrl ? `<p style="margin:24px 0"><a href="${invoiceUrl}" style="background:#151414;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">결제 다시 시도 / Retry payment</a></p>` : ''}
      `),
    })
  }

  // Always tell the owner — this is the money-chasing signal.
  await send({
    to: OWNER_INBOXES,
    subject: `[ZOE 결제실패] ${clientName} — ${amount} (시도 ${attempt}회)`,
    text: `${clientName} / ${amount} / attempt ${attempt}\n${invoiceUrl ?? ''}`,
    html: shell(`
      <h1 style="font-size:20px;font-weight:600;margin:18px 0 6px">결제 실패</h1>
      <p style="line-height:1.8">${name} — <strong>${amount}</strong><br>시도 횟수: ${attempt}</p>
      ${invoiceUrl ? `<p><a href="${invoiceUrl}" style="color:#b48a43">인보이스 보기</a></p>` : ''}
      <p style="color:#999;font-size:13px">/admin/billing 의 Needs attention 에도 표시됩니다.</p>
    `),
  })
}

/**
 * Nudge a client who was sent a pay link but never used it. Deliberately soft:
 * the most common reason a small-business owner hasn't paid is that the message
 * scrolled off their phone, not that they refuse to.
 */
export async function sendPaymentReminder(args: {
  to: string
  clientName: string
  amountCents: number
  payUrl: string
  interval: 'month' | 'year' | 'once'
  daysLeft: number
}) {
  const { to, clientName, amountCents, payUrl, interval, daysLeft } = args
  const amount = fmtUSD(amountCents)
  const name = escapeHtml(clientName)
  const per = interval === 'once' ? '' : interval === 'year' ? ' / 년' : ' / 월'
  const expiry =
    daysLeft <= 7
      ? `<p style="color:#c0392b;font-size:13px">이 링크는 <strong>${daysLeft}일 후</strong> 만료됩니다.</p>`
      : ''

  await send({
    to,
    subject: `결제 안내 — ${amount}${per} / A friendly reminder from ZOE LUMOS`,
    text: `${clientName}님, 아직 결제가 확인되지 않았습니다. ${amount}${per}\n\n결제하기: ${payUrl}`,
    html: shell(`
      <h1 style="font-size:22px;font-weight:600;margin:18px 0 6px">결제 안내</h1>
      <p style="color:#777;margin:0 0 22px">A friendly reminder</p>
      <p style="line-height:1.8">
        <strong>${name}</strong> 님,<br>
        아직 결제가 완료되지 않아 안내드립니다.<br>
        <strong style="color:#b48a43;font-size:20px">${amount}</strong>${per}
      </p>
      ${expiry}
      <p style="margin:24px 0">
        <a href="${payUrl}" style="background:#151414;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">결제하기 / Pay now</a>
      </p>
      <p style="color:#999;font-size:13px">
        이미 결제하셨다면 이 메일은 무시해 주세요.<br>
        <span>If you've already paid, please disregard this message.</span>
      </p>
    `),
  })
}

/**
 * Sent to us when a subscription is scheduled to stop renewing. Churn is the
 * one event we must never learn about from a bank statement.
 */
export async function sendCancellationAlert(args: {
  clientName: string
  amountCents: number
  email: string | null
  endsAt: number | null
}) {
  const { clientName, amountCents, email, endsAt } = args
  const ends = endsAt
    ? new Date(endsAt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '기간 종료일 미정'

  await send({
    to: OWNER_INBOXES,
    subject: `[ZOE 구독취소] ${clientName} — ${fmtUSD(amountCents)}/월 (${ends} 종료)`,
    text: `${clientName} scheduled cancellation. ${fmtUSD(amountCents)}/month ends ${ends}. ${email ?? ''}`,
    html: shell(`
      <h1 style="font-size:20px;font-weight:600;margin:18px 0 6px">구독 취소 예정</h1>
      <p style="line-height:1.8">
        <strong>${escapeHtml(clientName)}</strong><br>
        <span style="color:#c0392b;font-size:20px">${fmtUSD(amountCents)}</span> / 월<br>
        <strong>${ends}</strong> 까지 서비스 유지 후 종료됩니다.<br>
        ${email ? `<span style="color:#777">${escapeHtml(email)}</span>` : ''}
      </p>
      <p style="color:#999;font-size:13px">종료일 전에는 /admin/billing 에서 "Undo cancel" 로 되돌릴 수 있습니다.</p>
    `),
  })
}

/**
 * Sent to us when a client completes checkout — a new subscription, or a
 * one-time payment. `pending` means the money has not landed yet: an ACH debit
 * clears the checkout screen days before it clears the bank.
 */
export async function sendNewPaymentAlert(args: {
  clientName: string
  amountCents: number
  email: string | null
  kind: 'subscription' | 'one_time'
  pending: boolean
}) {
  const { clientName, amountCents, email, kind, pending } = args
  const isSub = kind === 'subscription'
  const heading = isSub ? '신규 구독' : '1회 결제'
  const suffix = isSub ? ' / 월' : ' (1회)'
  const status = pending
    ? '<p style="background:#fff3cd;color:#7a5b00;padding:10px 12px;border-radius:6px;font-size:13px">은행 이체(ACH) 처리 중 — 2~4 영업일 후 입금됩니다.</p>'
    : ''

  await send({
    to: OWNER_INBOXES,
    subject: `[ZOE ${isSub ? '신규구독' : '1회결제'}] ${clientName} — ${fmtUSD(amountCents)}${isSub ? '/월' : ''}${pending ? ' (처리중)' : ''}`,
    text: `${clientName} — ${fmtUSD(amountCents)} ${kind}${pending ? ' (pending ACH)' : ''}. ${email ?? ''}`,
    html: shell(`
      ${status}
      <h1 style="font-size:20px;font-weight:600;margin:18px 0 6px">${heading}</h1>
      <p style="line-height:1.8">
        <strong>${escapeHtml(clientName)}</strong><br>
        <span style="color:#b48a43;font-size:20px">${fmtUSD(amountCents)}</span>${suffix}<br>
        ${email ? `<span style="color:#777">${escapeHtml(email)}</span>` : ''}
      </p>
    `),
  })
}
