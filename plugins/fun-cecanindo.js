let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/indon', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.result, 'Nieh banh', wm, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['cecanindo']
handler.tags = ['fun']
handler.command = /^(cecanindo)$/i

module.exports = handler