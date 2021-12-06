const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
      dfail('admin', m, conn)
      throw false
    }
  }
  let users = participants.map(u => u.jid).filter(u => u != conn.user.jid)
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  let msg = conn.cMod(
    m.chat,
    conn.prepareMessageFromContent(
      m.chat,
      {
        [c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : {
          text: c || ''
        }
      },
      {
        contextInfo: {
          mentionedJid: users
        }
      }
    ),
    text || q.text
  )
  await conn.relayWAMessage(msg)
}
handler.help = ['hidetag'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^(h(ide)?tag)$/i

module.exports = handler

