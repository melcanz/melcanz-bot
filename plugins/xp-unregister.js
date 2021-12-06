let handler = async function (m) {
  let user = db.data.users[m.sender]
  user.registered = false
  m.reply(`berhasil!`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v)
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i

handler.register = true

module.exports = handler