let handler = async (m, { conn }) => {
    conn.sendFile(m.chat, global.API('amel', '/darkjokes', {}, 'apikey'), '', wm, m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['darkjoke']
handler.tags = ['fun']
handler.command = /^((drag|dark)joke)$/i

module.exports = handler
