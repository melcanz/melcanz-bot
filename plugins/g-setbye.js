let handler = async (m, { conn, text, isAdmin, isOwner, usedPrefix, command }) => {
  if (text) {
    if (!(isAdmin || isOwner)) {
      dfail('admin', m, conn)
      throw false
    }
    db.data.chats[m.chat].sBye = text
    m.reply('bye berhasil diatur\n@user (Mention)')
  } else throw `contoh:\n${usedPrefix + command} bye, @user!`
}
handler.help = ['setbye <teks>']
handler.tags = ['group']
handler.command = /^setbye$/i

handler.group = true

module.exports = handler