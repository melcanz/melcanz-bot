const { sticker5 } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, text }) => {
    let stiker = false
    try {
        let [packname, ...author] = text.split`|`
        author = (author || []).join`|`
        let q = m.quoted ? m.quoted : m
        let mime = m.quoted.mimetype || ''
        if (/webp/.test(mime)) {
            let img = await q.download()
            let out = await uploadFile(img)
            stiker = await sticker5(0, out, packname || '', author || '')
        } else if (/image/.test(mime)) {
            let img = await q.download()
            let out = await uploadImage(img)
            stiker = await sticker5(0, out, packname || '', author || '')
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('max is 10 seconds!')
            let img = await q.download()
            let out = await uploadImage(img)
            stiker = await sticker5(0, out, packname || '', author || '')
        }
    } finally {
        if (stiker) await conn.sendFile(m.chat, stiker, '', '', m)
        else throw 'balas stikernya!'
    }
}
handler.help = ['wm <teks>|<teks>']
handler.tags = ['sticker']
handler.command = /^(wm)$/i

handler.limit = 1

module.exports = handler