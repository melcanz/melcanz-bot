let handler = async (m, { conn, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let chat = db.data.chats[m.chat]
    let user = db.data.users[who]
    let set = db.data.settings[conn.user.jid]
    if (/c(hat)?$/i.test(command)) {
        m.reply(`
┌「 *chat* 」${m.isGroup ? `
├ kedaluarsa: ${chat.groupTime ? conn.msToDate(chat.groupTime - new Date() * 1) : 'not set'}
├ ${chat.isBanned ? '✅' : '❌'} banned
├ ${chat.desc ? '✅' : '❌'} deskripsi
├ ${chat.welcome ? '✅' : '❌'} welcome
├ ${chat.detect ? '✅' : '❌'} detect
├ ${chat.antilink ? '✅' : '❌'} anti link` : ''}
├ ${chat.clear ? `✅ auto clear\n├ Clear: ${conn.msToDate(chat.clearTime - new Date() * 1)}` : '❌ auto clear'}
├ ${chat.delete ? '❌' : '✅'} anti delete
├ ${chat.document ? '✅' : '❌'} auto document
├ ${chat.download ? '✅' : '❌'} auto download
├ ${chat.getmsg ? '✅' : '❌'} auto getmsg
├ ${chat.autoread ? '✅' : '❌'} auto read
├ ${chat.stiker ? '✅' : '❌'} auto sticker
├ ${chat.viewonce ? '✅' : '❌'} auto viewOnce
└────
       `.trim())
    }
    if (/u(ser)?$/i.test(command)) {
        m.reply(`
┌「 *user* 」${user.registered ? `
├ umur: ${user.age}` : ``}
├ nama: ${user.name}
├ EXP: ${user.exp}
├ limit: ${user.limit}
├ premium: ${user.premium ? `✅\n├ kedaluarsa: ${conn.msToDate(user.premiumTime - new Date() * 1)}` : '❌'}
├ banned: ${user.banned ? '✅' : '❌'}
└────
            `.trim())
    }
    if (/b(ot)?$/i.test(command)) {
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)
        m.reply(`
┌「 *bot* 」
├ nama: ${conn.user.name}
├ uptime: ${uptime}
├ ${set.anticall ? '✅' : '❌'} anti call
├ ${set.antispam ? '✅' : '❌'} anti spam
├ ${set.antitroli ? '✅' : '❌'} anti troli
├ ${set.game ? '✅' : '❌'} game
├ ${set.group ? '✅' : '❌'} hanya grup
├ ${set.jadibot ? '✅' : '❌'} jadibot
├ ${set.private ? '✅' : '❌'} hanya pc
├ ${set.restrict ? '✅' : '❌'} restrict
├ ${set.self ? '✅' : '❌'} self
├ SW diforward ke: ${/g.us/.test(set.tosw) ? conn.getName(set.tosw) : '@' + set.tosw.split`@`[0]}
├ playlist: ${set.playlist}
└────
`.trim())
    }
}
handler.help = ['infochat', 'infouser', 'infobot']
handler.tags = ['info']
handler.command = /^(info(c(hat)?|u(ser)?|b(ot)?))$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}