let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/nsfwclassic', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.url, 'Tobat bang', wm, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['classic']
handler.tags = ['dewasa']
handler.command = /^(classic)$/i

module.exports = handler