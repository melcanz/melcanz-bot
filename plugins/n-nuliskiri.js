let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} melcanz`
    let res = await fetch(API('amel', '/nuliskiri', { text }, 'apikey'))
    if (!res.ok) throw eror
    let img = await res.buffer()
    if (!img) throw img
    conn.sendFile(m.chat, img, 'nuliskiri.jpg', wm, m)
}
handler.help = ['nuliskiri'].map(v => v + ' <teks>')
handler.tags = ['nulis']
handler.command = /^(nuliskiri)$/i

module.exports = handler