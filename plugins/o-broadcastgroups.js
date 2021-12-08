let handler = async (m, { conn, text }) => {
  let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && db.data.chats[v.jid].broadcast).map(v => v.jid)
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  m.reply(`_mengirim pesan siaran ke ${groups.length} grup_\nestimasi selesai ${groups.length * 1.5} detik`)
  for (let id of groups) {
    await conn.delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, '「 *broadcast* 」\n\n' + teks + '\n\n' + wm), false).catch(_ => _)
  }
  m.reply('*selesai*')
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i

handler.owner = true

module.exports = handler