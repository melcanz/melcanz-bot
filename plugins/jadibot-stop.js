let handler = async (m, { conn, isOwner }) => {
  if (global.conn.user.jid == conn.user.jid || !isOwner) throw 'nothing to do here.'
  else {
    await conn.reply(m.chat, 'successfully disconnected', m)
    conn.close()
  }
}
handler.help = ['stop']
handler.tags = ['jadibot']
handler.command = /^(stop)$/i

module.exports = handler