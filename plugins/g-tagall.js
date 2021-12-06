let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      dfail('admin', m, conn)
      throw false
    }
  } else {
    dfail('group', m, conn)
    throw false
  }
  let users = participants.map(u => u.jid).filter(u => u != conn.user.jid)
  m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '├ @' + v.replace(/@.+/, '')).join`\n` + '\n└────')
}

handler.help = ['tagall [teks]']
handler.tags = ['group']
handler.command = ['tagall', 'everyone']

module.exports = handler