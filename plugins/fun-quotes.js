let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await axios.get(API('amel', '/quotes', {}, 'apikey'))

    let json = res.data
    conn.sendButton(m.chat, json.author, json.quotes, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['quotes']
handler.tags = ['fun']
handler.command = /^(quotes)$/i

module.exports = handler