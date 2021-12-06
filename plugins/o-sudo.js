const { newMessagesDB } = require("@adiwajshing/baileys")

let handler = async (m, { conn, text }) => {
    if (!text) throw false
    if (m.sender == conn.user.jid) {
        dfail('rowner', m, conn)
        throw false
    }
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw 'tag someone'
    txt = text.replace('@' + who.split`@`[0], '').trimStart()
    conn.emit('chat-update', {
        jid: who,
        hasNewMessage: true,
        messages: newMessagesDB([conn.cMod(m.chat, m, txt, who)])
    })
}
handler.command = /^sudo$/

handler.rowner = true

module.exports = handler