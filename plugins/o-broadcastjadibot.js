let handler = async (m, { conn, usedPrefix, text }) => {
  if (conn.user.jid !== global.conn.user.jid) throw false
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  let content = conn.cMod(m.chat, cc, '「 Broadcast 」\n\n' + teks)
  for (let id of users) conn.copyNForward(id, content, true)
  conn.reply(m.chat, `_Successfully sent broadcast to ${users.length} number that became bot_
${users.map(v => 'wa.me/' + v.replace(/[^0-9]/g, '') + `?text=${encodeURIComponent(usedPrefix)}menu`).join('\n')}`.trim(), m)
}
handler.help = ['broadcastjadibot', 'bcbot'].map(v => v + ' <text>')
handler.tags = ['host']
handler.command = /^(broadcast|bc)(jadi)?bot$/i

handler.rowner = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

