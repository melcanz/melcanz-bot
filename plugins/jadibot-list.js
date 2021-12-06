async function handler(m) {
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]
  m.reply(users.map(v => 'wa.me/' + v.jid.replace(/[^0-9]/g, '') + `?text=bot (${v.name})`).join('\n'))
}
handler.command = handler.help = ['listbot']
handler.tags = ['jadibot']

handler.rowner = true

module.exports = handler
