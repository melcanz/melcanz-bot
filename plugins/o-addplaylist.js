let handler = async (m, { text }) => {
    if (!text) throw `uhm.. where the text?\n\nexample:\n${usedPrefix + command} 37i9dQZEVXbObFQZ3JLcXt`
    if (db.data.settings[this.user.jid].playlist.includes(text)) return m.reply(`'${text}' already added!`)
    db.data.settings[this.user.jid].playlist.push(`${text}`)
    m.reply(`'${text}' successfully added!`)
}
handler.help = ['+playlist <text>']
handler.tags = ['owner']
handler.command = /^(add|\+)playlist$/i

handler.owner = true

module.exports = handler