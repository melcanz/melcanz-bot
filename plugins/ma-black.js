let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command}) => {
if (!text) throw `teksnya mana bang?\n\n${usedPrefix + command} melcanz`
let res = await fetch(API('amel', '/oxy/black', { text }, 'apikey'))
if (!res.ok) throw eror
let img = await res.buffer()
if (!img) throw img
conn.sendFile(m.chat, img, 'black.jpg', wm, m)
}
handler.help = ['black'].map(v => v + '<teks>')
handler.tags = ['maker']
handler.command = /^(black)$/

module.exports = handler