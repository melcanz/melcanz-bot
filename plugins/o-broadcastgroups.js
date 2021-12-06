let handler = async (m, { conn, text }) => {
  let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us')).map(v => v.jid)
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Send a broadcast message to ${groups.length} group_\nestimation complete ${groups.length * 1.5} seconds`, m)
  for (let id of groups) {
    await delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, '「 Broadcast 」\n\n' + teks + '\n\n' + wm), true).catch(_ => _)
  }
  m.reply('_*Broadcast Finished*_')
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i

handler.owner = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))