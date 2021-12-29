let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command}) => {
if (!text) throw `teksnya mana bang?\n\n${usedPrefix + command} melcanz`
let res = await fetch(API('amel', '/oxy/underwater', { text }, 'apikey'))
if (!res.ok) throw eror
let img = await res.buffer()
if (!img) throw img
conn.sendFile(m.chat, img, 'underwater.jpg', wm, m)
}
handler.help = ['underwater'].map(v => v + '<teks>')
handler.tags = ['maker']
handler.command = /^(underwater)$/

module.exports = handler