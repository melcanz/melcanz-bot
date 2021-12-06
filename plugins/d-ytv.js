let limit = 30
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!args || !args[0]) throw 'uhm... urlnya mana?'
    let chat = global.db.data.chats[m.chat]
    let server = (args[1] || servers[0]).toLowerCase()
    let { dl_link, thumb, title, filesize, filesizeF } = await ytv(args[0], servers.includes(server) ? server : servers[0])
    let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
    m.reply(isLimit ? `ukuran file: ${filesizeF}\nukuran file diatas ${limit} MB, download sendiri: ${dl_link}` : global.wait)
    let _thumb = {}
    try { _thumb = { thumbnail: await (await fetch(thumb)).buffer() } }
    catch (e) { }
    if (!isLimit) conn.sendFile(m.chat, dl_link, '', `
*judul:* ${title}
*ukuran file:* ${filesizeF}
  `.trim(), m, 0, {
        ..._thumb,
        asDocument: chat.useDocument
    })
}
handler.help = ['mp4', 'v', ''].map(v => 'yt' + v + ` <url>`)
handler.tags = ['download']
handler.command = /^yt(v|mp4)?$/i

handler.limit = 1

module.exports = handler

