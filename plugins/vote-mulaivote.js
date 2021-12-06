let handler = async (m, { conn, text, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            dfail('admin', m, conn)
            throw 0
        }
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) {
        await conn.sendButton(m.chat, `masih ada sesi vote!`, wm, 'hapus sesi', '.-vote', m)
        throw 0
    }
    await conn.send2Button(m.chat, `sesi vote dimulai!`, wm, 'upvote', '.upvote', 'devote', '.devote', m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['mulaivote [teks]']
handler.tags = ['vote']
handler.command = /^(\+|start|mulai)vote$/i

module.exports = handler