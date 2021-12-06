let handler = async (m, { conn }) => {
    let sw = Object.entries(global.db.data.users).filter(v => v[1].sw)
    let tosw = db.data.settings[conn.user.jid].tosw
    let pesan = `
┌「 *daftar sw* 」
│ diterukan ke ${/g.us/.test(tosw) ? conn.getName(tosw) : '@' + tosw.split`@`[0]}${sw ? '\n' + sw.map(([jid], i) => `
├ ${i + 1}. @${jid.split`@`[0]}
`.trim()).join('\n') : ''}
└────
`.trim()
    m.reply(pesan)
}
handler.help = ['swlist']
handler.tags = ['owner']
handler.command = /^listsw|swlist|daftarsw$/i

handler.owner = 1

module.exports = handler