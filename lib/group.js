export function shouldReplyGroup(msg, botJid) {
  if (!msg.key.remoteJid.endsWith('@g.us')) return true

  const mentioned =
    msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

  return mentioned.includes(botJid)
}