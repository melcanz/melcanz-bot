let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakanime = conn.tebakanime ? conn.tebakanime : {}
  let id = m.chat
  if (id in conn.tebakanime) {
    conn.reply(m.chat, 'belum dijawab!', conn.tebakanime[id][0])
    throw false
  }
  let res = await fetch(API('amel', '/tebakanime', {}, 'apikey'))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  let caption = `
    ${json.anime}
Waktu *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk bantuan
`.trim()
  conn.tebakanime[id] = [
    await conn.sendButtonImg(m.chat, json.img, caption, wm, 'Bantuan', '.hint', m),
    json, poin,
    setTimeout(async () => {
      if (conn.tebakanime[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.nama}*`, wm, 'Tebak Anime', '.tebakanime', conn.tebakanime[id][0])
      delete conn.tebakanime[id]
    }, timeout)
  ]
}
handler.help = ['tebakanime']
handler.tags = ['game']
handler.command = /^tebakanime$/i

handler.game = true

module.exports = handler