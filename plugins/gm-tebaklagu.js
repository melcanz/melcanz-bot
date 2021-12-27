let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {

    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.reply(m.chat, 'belum dijawab!', conn.tebaklagu[id][0])
        throw false
    }
    let res = await fetch(API('amel', '/tebaklagu', { id: conn.pickRandom(db.data.settings[conn.user.jid].playlist) }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    if (json.preview == null) {
        await conn.sendButton(m.chat, 'audio tidak ditemukan!', wm, 'Tebak Lagu', '.tebaklagu', m)
        throw 0
    }
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}cek untuk bantuan
`.trim()
    conn.tebaklagu[id] = [
        await conn.sendButton(m.chat, caption, wm, 'Bantuan', '.cek', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebaklagu[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul.split('(')[0].split('-')[0].trim()}*`, wm, 'Tebak Lagu', `${usedPrefix}tebaklagu`, conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.preview, 'eror.mp3', caption, m, 0, { mimetype: 'audio/mp4' })
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^tebaklagu$/i

handler.game = true

module.exports = handler