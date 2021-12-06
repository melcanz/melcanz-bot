let handler = async (m, { conn, participants }) => {
    let who
    if (!m.isGroup) who = m.sender
    else {
        let member = participants.map(u => u.jid)
        who = member[Math.floor(Math.random() * member.length)]
    }
    conn.reply(m.chat, `@${who.split`@`[0]}`, m)
}
handler.help = ['', 'kah'].map(v => 'siapa' + v + ' <teks>?')
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^siapa(kah)?$/i

module.exports = handler