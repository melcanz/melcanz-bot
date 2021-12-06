module.exports = Object.assign(async function handler(m, { text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `tidak ada hash`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) {
        dfail('owner', m, conn)
        throw 0
    }
    delete sticker[hash]
    m.reply(`berhasil dihapus!`)
}, {
    help: ['cmd'].map(v => 'del' + v + ' <text>'),
    tags: ['database'],
    command: ['delcmd']
})