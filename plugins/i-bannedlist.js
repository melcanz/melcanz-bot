let handler = async (m, { conn, isOwner }) => {
    let chats = conn.chats.all().filter(v => v.jid.endsWith('g.us') && db.data.chats[v.jid].isBanned).map(v => v.jid)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let pesan = `
┌「 *daftar chat* 」
│ total: ${chats.length} chat${chats ? '\n' + chats.map((v, i) => `
├ ${i + 1}. ${conn.getName(v) == undefined ? 'gk tau' : conn.getName(v)}
├ ${v}
`.trim()).join('\n') : ''}
└────
┌「 *daftar pengguna* 」
│ total: ${users.length} pengguna${users ? '\n' + users.map(([jid], i) => `
├ ${i + 1}. ${db.data.users[jid].name}${isOwner ? `\n├ @${jid.split`@`[0]}` : ''}
`.trim()).join('\n') : ''}
└────
`.trim()
    m.reply(pesan)
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i

module.exports = handler