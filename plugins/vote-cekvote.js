let handler = async (m, { conn }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `tidak ada sesi vote!`, wm, 'mulai vote', '.mulaivote', m)
        throw 0
    }

    let [reason, upvote, devote] = conn.vote[id]
    await conn.sendButton(m.chat, `
*alasan:* ${reason}
*Upvote*
_total: ${upvote.length}_
${upvote.map(v => `@${v.split`@`[0]}`).join('\n')}

*Devote*
_total: ${devote.length}_
${devote.map(v => `@${v.split`@`[0]}`).join('\n')}
`.trim(), wm, 'hapus sesi', '.hapusvote', m)
}
handler.help = ['cekvote']
handler.tags = ['vote']
handler.command = /^(cek|check)vote$/i

module.exports = handler