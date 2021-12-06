let handler = async (m, { conn, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `tidak ada sesi vote!`, wm, 'mulai vote', '.+vote', m)
        throw 0
    }
    let isVote = conn.vote[id][1].concat(conn.vote[id][2])
    const wasVote = isVote.includes(m.sender)
    if (wasVote) throw 'udah vote!'
    if (/up/i.test(command)) {
        conn.vote[id][1].push(m.sender)
    } else if (/de/i.test(command)) {
        conn.vote[id][2].push(m.sender)
    }
    let [reason, upvote, devote] = conn.vote[id]
    await conn.send2Button(m.chat, `
*alasan:* ${reason}
*Upvote*
_total: ${upvote.length}_
${upvote.map(u => `@${u.split`@`[0]}`).join('\n')}

*Devote*
_total: ${devote.length}_
${devote.map(u => `@${u.split`@`[0]}`).join('\n')}
    `.trim(), wm, 'upvote', '.upvote', 'devote', '.devote', m)
}
handler.help = ['upvote', 'devote']
handler.tags = ['vote']
handler.command = /^(up|de)vote$/i

module.exports = handler
