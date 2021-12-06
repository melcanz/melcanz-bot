let handler = async (m, { conn }) => {
  if (!db.data.settings[conn.user.jid].restrict) return await conn.sendButton(m.chat, 'info: if used too often, the number will be banned', wm, 'On Restrict', '.on restrict', m)
  if (m.quoted) {
    await conn.groupRemove(m.chat, [m.quoted.sender])
    conn.reply(conn.user.jid, `@${m.sender.split`@`[0]} kick @${m.quoted.sender.split`@`[0]}`, m)
  }
  let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  for (let user of users) {
    if (user.endsWith('@s.whatsapp.net')) {
      await conn.groupRemove(m.chat, [user])
      conn.reply(conn.user.jid, `@${m.sender.split`@`[0]} kick @${user.split`@`[0]}`, m)
    }
  }
}
handler.help = ['kick', '-'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(kick|\-)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler
