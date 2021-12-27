let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/randomneko', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.url, 'Nieh banh nekonya', wm, 'neko again', `${usedPrefix + command}`, m)
}
handler.help = ['neko']
handler.tags = ['fun']
handler.command = /^(neko)$/i

module.exports = handler