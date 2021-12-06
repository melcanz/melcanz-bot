let handler = async (m, { usedPrefix, text, command }) => {
    if (text === 'all') {
        let users = Object.entries(global.db.data.users).filter(user => !user[1].premium)
        for (let i = 0; i < users.length; i++) {
            db.data.users[users[i][0]].exp = 0
            db.data.users[users[i][0]].limit = 10
        }
        return await m.reply('successfully reset all users, except premium users')
    }
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    let user = db.data.users[who]
    if (!who) return m.reply(`tag or mention someone!\n\nexample:\n${usedPrefix + command} @${m.sender.split`@`[0]}`)
    user.limit, user.exp = 0
    m.reply(`successfully reset *${user.name}*`)
}
handler.help = ['reset [@user]']
handler.tags = ['owner']
handler.command = /^reset$/i

handler.rowner = true

module.exports = handler