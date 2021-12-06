let handler = async (m, { conn, args }) => {
  let group = m.chat
  if (/^.*@g\.us$/.test(args[0])) group = args[0]
  if (!/^.*@g\.us$/.test(group)) throw 'hanya bisa dibuka di grup'
  let groupMetadata = await conn.groupMetadata(group)
  if (!groupMetadata) throw 'groupMetadata is undefined'
  if (!'participants' in groupMetadata) throw 'participants is not defined'
  let me = groupMetadata.participants.find(user => user.jid === conn.user.jid)
  if (!me) throw 'bot tidak ada di grup itu'
  if (me.isAdmin !== true) throw 'bot bukan admin'
  m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['link']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i

module.exports = handler

