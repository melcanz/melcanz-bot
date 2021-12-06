module.exports = Object.assign(async function handler(m, { text, usedPrefix, command }) {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw `balas stikernya!`
    if (m.quoted.mimetype != 'image/webp') throw `balas stikernya!`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash gk ada'
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} tes`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (sticker[hash] && sticker[hash].locked) {
        dfail('owner', m, conn)
        throw 0
    }
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`berhasil!`)
}, {
    help: ['cmd'].map(v => 'set' + v + ' <teks>'),
    tags: ['database'],
    command: ['setcmd']
})
