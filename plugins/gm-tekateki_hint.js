let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (!(id in conn.tekateki)) throw 0
    let json = conn.tekateki[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\n\nbalas soalnya, bukan pesan ini!', conn.tekateki[id][0])
}
handler.command = /^tete$/i

handler.limit = 1

module.exports = handler