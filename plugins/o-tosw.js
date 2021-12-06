let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw `uhm.. where the jid?\n\nexample:\n${usedPrefix}tosw 6283128734012`
    let to = /g.us/.test(text) ? text : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    db.data.settings[conn.user.jid].tosw = to
    m.reply(`successfully set tosw with jid '${to}'`)
}
handler.help = ['tosw <jid>']
handler.tags = ['owner']
handler.command = /^tosw$/i

handler.owner = true

module.exports = handler