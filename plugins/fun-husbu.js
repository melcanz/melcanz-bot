let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await axios.get(API('amel', '/husbu', {}, 'apikey'))

    let json = res.data
    conn.sendButtonImg(m.chat, json.result.image, json.result.teks, wm, 'husbu again', `${usedPrefix + command}`, m)
}
handler.help = ['husbu']
handler.tags = ['fun']
handler.command = /^(husbu)$/i

module.exports = handler