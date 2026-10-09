// The fee lines for contract emails (viewed, signed, fully executed).
// The monthly subscription only when there is one, and the MACH Dashboard on
// its own line, since it bills separately: one-time fees at signing, then its
// own monthly fee once it goes live. Mirrors Command Center's
// src/lib/dashboard.js; keep the two in step.
const num = (v) => {
  const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}
const money = (n) => '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })

export function contractFeeLines(contract) {
  const lines = []
  const services = contract.services || []
  const monthly = num(contract.monthly_fee)
  if (monthly > 0 || services.some(s => ['website', 'organic', 'paid_media', 'addon'].includes(s))) {
    lines.push(['Monthly Fee', monthly ? money(monthly) : '—'])
  }
  if (services.includes('dashboard')) {
    const d = contract.contract_data || {}
    const systems = Array.isArray(d.dashboard_systems) ? d.dashboard_systems : []
    const oneTime = num(d.dashboard_build_fee) + systems
      .filter(s => s && s.status !== 'not_possible')
      .reduce((sum, s) => sum + num(s.fee), 0)
    const dashMonthly = num(d.dashboard_monthly_fee)
    lines.push(['MACH Dashboard', dashMonthly
      ? `${money(oneTime)} one-time, due at signing; ${money(dashMonthly)}/month once live`
      : `${money(oneTime)} one-time, due at signing`])
  }
  return lines
}
