let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\ncontoh:\n\n${usedPrefix + command} melcanz`
    let res = await fetch(API('amel', '/nuliskanan', { text }, 'apikey'))
    if (!res.ok) throw eror
    let img = await res.buffer()
    if (!img) throw img
    conn.sendFile(m.chat, img, 'nuliskanan.jpg', wm, m)
}
handler.help = ['nuliskanan'].map(v => v + ' <teks>')
handler.tags = ['nulis']
handler.command = /^(nuliskanan)$/i

module.exports = handler