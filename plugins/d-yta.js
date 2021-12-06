let limit = 30
const { servers, yta } = require('../lib/y2mate')

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!args || !args[0]) throw `contoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=yxDdj_G9uRY`
    let chat = db.data.chats[m.chat]
    let server = (args[1] || servers[0]).toLowerCase()
    let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
    let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
    m.reply(isLimit ? `ukuran file: ${filesizeF}\nukuran file diatas ${limit} MB, download sendiri: ${dl_link}` : wait)
    if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `
*judul:* ${title}
*ukuran file:* ${filesizeF}
`.trim(), m, 0, { asDocument: chat.useDocument, mimetype: 'audio/mp4' })
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['download']
handler.command = /^yt(a|mp3)$/i

handler.limit = 1

module.exports = handler

