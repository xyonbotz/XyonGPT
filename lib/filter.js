const cooldown = {}

export function isSpam(jid) {
  const now = Date.now()
  if (cooldown[jid] && now - cooldown[jid] < 5000) {
    return true
  }
  cooldown[jid] = now
  return false
}

export function safeText(text) {
  if (text.length > 1000) return false
  if (/judol|slot|spam/i.test(text)) return false
  return true
}