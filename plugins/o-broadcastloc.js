let handler = async (m, { conn, text }) => {
    let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && db.data.chats[v.jid].broadcast).map(v => v.jid)
    m.reply(`_mengirim pesan siaran ke ${groups.length} grup_\nestimasi selesai ${groups.length * 1.5} detik`)
    for (let id of groups) {
        await conn.delay(1500)
        await conn.sendButtonLoc(id, fla + 'broadcast', text, wm, 'broadcast', 'broadcast')
    }
    m.reply('*selesai*')
}
handler.help = ['bcloc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(loc)$/i

handler.owner = true

module.exports = handler