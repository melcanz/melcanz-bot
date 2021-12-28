let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/nsfwcumsluts', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.url, 'Tobat bang', wm, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['cumsluts']
handler.tags = ['dewasa']
handler.command = /^(cumsluts)$/i

module.exports = handler