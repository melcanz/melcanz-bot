let handler = async (m, { conn }) => {
    let bc = conn.chats.all().filter(v => v.jid.endsWith('g.us') && (db.data.chats[v.jid] == undefined ? db.data.chats[v.jid] = {
        isBanned: false,
        welcome: true,
        detect: true,
        sWelcome: '',
        sBye: '',
        sPromote: '',
        sDemote: '',
        antiLink: true,
        autoread: false,
        broadcast: true,
        clear: false,
        clearTime: (new Date() * 1) + 3600000 * 1,
        delete: true,
        desc: true,
        download: true,
        getmsg: false,
        groupTime: 0,
        stiker: false,
        viewonce: true,
    } : db.data.chats[v.jid].broadcast)).map(v => v.jid)
    let pesan = `
┌「 *daftar broadcast* 」
│ total : ${bc.length} grup${bc ? '\n' + bc.map((v, i) => `
├ ${i + 1}. ${conn.getName(v) != undefined ? conn.getName(v) : v}
`.trim()).join('\n') : ''} 
└────
`.trim()
    m.reply(pesan)
}
handler.help = ['bclist']
handler.tags = ['owner']
handler.command = /^listbc|bclist|daftarbc$/i

handler.owner = 1

module.exports = handler