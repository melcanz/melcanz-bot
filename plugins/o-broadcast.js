let handler = async (m, { conn, text }) => {
  let chats = conn.chats.all().filter(v => v.jid.endsWith('.net')).map(v => v.jid)
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Send a broadcast message to ${chats.length} chat_\nestimation complete ${chats.length * 1.5} seconds`, m)
  for (let id of chats) {
    await delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, '「 Broadcast 」\n\n' + teks + '\n\n' + wm), true).catch(_ => _)
  }
  m.reply('_*Broadcast Finished*_')
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))