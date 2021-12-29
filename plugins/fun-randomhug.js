let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/randomhug', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
conn.sendFile(m.chat, json.url, json.url, 'Hug', m, 0, { mimetype: 'video/mp4' })
}
handler.help = ['hug']
handler.tags = ['fun']
handler.command = /^(hug)$/i

module.exports = handler