// Read-only: our Google Ads account 169-497-4047, enabled campaigns, last 7 days.


const e = process.env, V = 'v24', D = '1694974047'
const tok = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ client_id: e.GOOGLE_OAUTH_CLIENT_ID, client_secret: e.GOOGLE_OAUTH_CLIENT_SECRET, refresh_token: e.GOOGLE_REFRESH_TOKEN, grant_type: 'refresh_token' }) })).json()
if (!tok.access_token) { console.log('token error:', tok.error, tok.error_description, '→ run reauth.mjs instead'); process.exit(1) }
const H = { Authorization: `Bearer ${tok.access_token}`, 'developer-token': e.GADS_DEVELOPER_TOKEN, 'content-type': 'application/json' }
async function gaql(q) {
  const r = await fetch(`https://googleads.googleapis.com/${V}/customers/${D}/googleAds:searchStream`, { method: 'POST', headers: H, body: JSON.stringify({ query: q }) })
  const t = await r.text(); if (!r.ok) return { error: r.status, body: t.slice(0, 600) }
  return JSON.parse(t).flatMap(b => b.results || [])
}
const strip = o => JSON.parse(JSON.stringify(o, (k, v) => k === 'resourceName' ? undefined : v))
const rows = async (k, q) => { const v = await gaql(q); console.log('\n== ' + k); if (!Array.isArray(v)) return console.log(JSON.stringify(v)); for (const r of v) console.log(JSON.stringify(strip(r))) }
const W = m => Math.round(Number(m || 0) / 1e6) // micros → KRW

await rows('campaign', `SELECT campaign.name, campaign.status, campaign.serving_status, campaign.primary_status, campaign.primary_status_reasons, campaign.bidding_strategy_system_status, campaign_budget.amount_micros FROM campaign WHERE campaign.status = 'ENABLED'`)
await rows('daily (last 7 days)', `SELECT campaign.name, segments.date, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.ctr, metrics.conversions, metrics.search_impression_share, metrics.search_budget_lost_impression_share, metrics.search_rank_lost_impression_share FROM campaign WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS ORDER BY segments.date`)
await rows('hourly with impressions (KST)', `SELECT segments.date, segments.hour, metrics.impressions, metrics.clicks, metrics.cost_micros FROM campaign WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS AND metrics.impressions > 0 ORDER BY segments.date, segments.hour`)
await rows('ads: approval', `SELECT ad_group.name, ad_group_ad.status, ad_group_ad.policy_summary.approval_status, ad_group_ad.policy_summary.review_status, ad_group_ad.policy_summary.policy_topic_entries FROM ad_group_ad WHERE campaign.status = 'ENABLED'`)
await rows('ad groups (7 days)', `SELECT ad_group.name, metrics.impressions, metrics.clicks, metrics.cost_micros FROM ad_group WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS`)
await rows('search terms (7 days)', `SELECT search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.cost_micros FROM search_term_view WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS ORDER BY metrics.impressions DESC LIMIT 40`)
await rows('conversions by action (7 days)', `SELECT segments.conversion_action_name, metrics.all_conversions FROM campaign WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_7_DAYS`)
await rows('enabled campaigns (should be only 24462991144)', `SELECT campaign.id, campaign.name, campaign.status FROM campaign WHERE campaign.status = 'ENABLED'`)

// Balance = adjusted limit minus served. The approved limit alone under-counts it (Google adds adjustments on top).
const b = await gaql(`SELECT account_budget.status, account_budget.approved_spending_limit_micros, account_budget.adjusted_spending_limit_micros, account_budget.amount_served_micros FROM account_budget WHERE account_budget.status = 'APPROVED'`)
