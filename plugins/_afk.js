let handler = m => m

handler.before = (m, { conn }) => {
  let user = db.data.users[m.sender]
  if (user.afk > -1) {
    m.reply(`
kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
selama ${conn.clockString(new Date - user.afk)}
`.trim())
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m.reply(`
jangan tag dia!
dia lagi AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
selama ${conn.clockString(new Date - afkTime)}
`.trim())
  }
  return !0
}

module.exports = handler