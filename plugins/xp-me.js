let handler = async (m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = db.data.users[who]
    if (typeof user == 'undefined') {
        user = {
            exp: 0,
            limit: 10,
            registered: false,
            name: conn.getName(m.sender),
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            autolevelup: false,
            banned: false,
            level: 0,
            premium: false,
            premiumTime: 0,
            role: '',
            sw: false,
        }
    }
    m.reply(`*${user.limit}* Limit\n*${user.exp}* XP\nLevel *${user.level}*\nRole *${user.role}*`)
}
handler.help = ['me [@user]']
handler.tags = ['xp']
handler.command = /^(me)$/i

module.exports = handler