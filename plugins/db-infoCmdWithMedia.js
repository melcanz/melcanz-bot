module.exports = Object.assign(async function handler(m, { conn, text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw 'tidak ada hash'
    let sticker = global.db.data.sticker[hash]
    if (sticker) return m.reply(`
*fileSha256:* ${hash}
*teks:* ${sticker.text}
*waktu dibuat:* ${sticker.at}
*dikunci:* ${sticker.locked ? '✅' : '❌'}
*nama pembuat:* ${conn.getName(sticker.creator)}
*no pembuat:* ${splitM(sticker.creator)}


${sticker.mentionedJid.length > 0 ? `*Cmd Mention:*

${sticker.mentionedJid.map((v, i) => `No. *${i + 1}*:\n*Nama:* ${conn.getName(v)}\n*No:* ${splitM(v)}`).join('\n\n')}` : ''} 
`.trim())
    else m.reply('stiker ini tidak terdaftar')
}, {
    help: ['cmd'].map(v => 'info' + v + ' <teks>'),
    tags: ['database'],
    command: ['infocmd']
})

/**
 * split Jid
 * @param {String} jid 
 * @returns String
 */
function splitM(jid) {
    return jid.split`@`[0]
}