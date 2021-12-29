let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/hijab', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    conn.sendButtonImg(m.chat, json.result, 'Nieh banh', wm, 'lagi', `${usedPrefix + command}`, m)
}
handler.help = ['cecanhijab']
handler.tags = ['fun']
handler.command = /^(cecanhijab)$/i

module.exports = handler