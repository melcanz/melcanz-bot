let handler = async (m, { conn, text, usedPrefix, command, isPrems }) => {
    let pajak = isPrems ? 0 : 0.02
    if (!text) {
        m.reply(`this command is to give limits to other users\n\nexamlpe:\n${usedPrefix + command} @${m.sender.split`@`[0]} 10\nor reply to someone message with the command: ${usedPrefix + command} 10`)
        throw false
    }
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.mentionedJid[0] ? m.mentionedJid[0] : m.chat
    if (typeof db.data.users[who] == 'undefined') {
        db.data.users[who] = {
            exp: 0,
            limit: 10,
            registered: false,
            name: conn.getName(m.sender),
            nim: -1,
            regTime: -1,
            banned: false,
        }
    }
    if (!who) {
        m.reply(`this command is to give limits to other users\n\nexamlpe:\n${usedPrefix + command} @${m.sender.split`@`[0]} 10\nor reply to someone message with the command: ${usedPrefix + command} 10`)
        throw false
    }
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `where the number?\n\nexamlpe:\n${usedPrefix + command} @${m.sender.split`@`[0]} 10\nor reply to someone message with the command: ${usedPrefix + command} 10`
    if (isNaN(txt)) throw 'only number!'
    let poin = parseInt(txt)
    let limit = poin
    let pjk = Math.ceil(poin * pajak)
    limit += pjk
    if (limit < 1) throw 'minimum 1'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'the limit is not enough to transfer, because there is a tax too'
    users[m.sender].limit -= limit
    users[who].limit += poin

    m.reply(`(${-poin} Limit) + (${-pjk} Limit (Tax ${pajak * 100}%)) = ( ${-limit} Limit)`)
    conn.fakeReply(m.chat, `+${poin} Limit`, who, m.text)
}
handler.help = ['transfer [@user] <number>']
handler.tags = ['xp']
handler.command = /^(transfer|tf)$/

module.exports = handler