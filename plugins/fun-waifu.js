let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/waifu', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.url, 'Nieh banh waifunya', wm, 'waifu again', `${usedPrefix + command}`, m)
}
handler.help = ['waifu']
handler.tags = ['fun']
handler.command = /^(waifu)$/i

module.exports = handler