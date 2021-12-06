let handler = async (m, { conn, usedPrefix, isOwner }) => {
  if (global.conn.user.jid == conn.user.jid || !isOwner) return await conn.sendButton(m.chat, 'this command is only for bots', wm, 'Become a Bot', '.bot', m)
  else {
    global.conn.reply(conn.user.jid, `${usedPrefix}bot ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, m)
    global.conn.reply(conn.user.jid, `${JSON.stringify(conn.base64EncodedAuthInfo())}`, m)
  }
}
handler.help = ['getcode']
handler.tags = ['jadibot']
handler.command = /^(getcode)$/i

module.exports = handler