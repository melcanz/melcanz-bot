let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/randombaka', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
conn.sendButtonImg(m.chat, json.url, 'Baka', wm, 'lagi', '.baka',m)
}
handler.help = ['baka']
handler.tags = ['fun']
handler.command = /^(baka)$/i

module.exports = handler