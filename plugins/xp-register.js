let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let user = db.data.users[m.sender]
  if (user.registered === true) {
    await conn.sendButton(m.chat, `kamu udah daftar, mau daftar ulang?`, wm, 'unreg', '.unreg', m)
    throw 0
  }
  if (!Reg.test(text)) return m.reply(`format:\n${usedPrefix}reg nama.umur\ncontoh:\n${usedPrefix}reg amel cantik.19`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 120) throw 'terlalu tua'
  if (age < 5) throw 'bocil?'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  m.reply(`
┌─「 *daftar berhasil* 」
├ nama: ${name}
├ umur: ${age}
└────
`.trim())
}
handler.help = ['reg', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']
handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler