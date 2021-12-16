let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `pengunaan:\n\n${usedPrefix + command} <teks> @user <teks>\ncontoh:\n${usedPrefix + command} siapa blm donasi? @6283128734012 saya bang`, m)
  let cm = copy(m)
  let who
  if (text.includes('@0')) who = '0@s.whatsapp.net'
  else if (m.isGroup) who = cm.participant = m.mentionedJid[0]
  else who = m.chat
  if (!who) return conn.reply(m.chat, `pengunaan:\n\n\ncontoh:\n${usedPrefix + command} siapa blm donasi? @6283128734012 saya bang`, m)
  cm.key.fromMe = false
  cm.message[m.mtype] = copy(m.msg)
  let sp = '@' + who.split`@`[0]
  let [fake, ...real] = text.split(sp)
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim())
    }
  })
}
handler.help = ['fitnah <teks> @user <teks>']
handler.tags = ['tools']
handler.command = /^(fitnah|fakereply)$/

module.exports = handler

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
