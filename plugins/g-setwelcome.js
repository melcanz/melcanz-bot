let handler = async (m, { conn, text, isOwner, usedPrefix, command, isAdmin }) => {
  if (text) {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
    }
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('welcome berhasil diatur\n@user (Mention)\n@subject (Title Group)\n@desc (Desc Group)')
  } else throw `contoh:\n${usedPrefix + command} hi, @user! welcome to the group @subject 
  
@desc`.trim()
}
handler.help = ['setwelcome <teks>']
handler.tags = ['group']
handler.command = /^setwelcome$/i

handler.group = true

module.exports = handler

