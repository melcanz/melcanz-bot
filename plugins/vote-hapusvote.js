let handler = async (m, { conn, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            dfail('admin', m, conn)
            throw 0
        }
    }
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `tidak ada sesi vote!`, wm, 'mulai vote', '.mulaivote', m)
        throw 0
    }
    delete conn.vote[id]
    m.reply(`berhasil menghapus sesi vote!`)

}
handler.help = ['-vote']
handler.tags = ['vote']
handler.command = /^(-|del(ete)?|hapus)vote$/i

module.exports = handler