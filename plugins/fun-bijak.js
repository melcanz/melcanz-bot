let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await axios.get(API('amel', '/bijak', {}, 'apikey'))

    let json = res.data
    conn.sendButton(m.chat, json.result, wm, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['bijak']
handler.tags = ['fun']
handler.command = /^(bijak)$/i

module.exports = handler