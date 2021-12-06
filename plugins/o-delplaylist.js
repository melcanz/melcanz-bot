let handler = async (m, { text }) => {
    if (!text) throw `uhm.. where the text?\n\nexample:\n${usedPrefix + command} 37i9dQZEVXbObFQZ3JLcXt`
    if (!db.data.settings[this.user.jid].playlist.includes(text)) return m.reply(`'${text}' not found!`)
    let index = db.data.settings[this.user.jid].playlist.findIndex(v => v === who)
    db.data.settings[this.user.jid].playlist.splice(index, 1)
    m.reply(`@${text} successfully removed!`)
}
handler.help = ['-playlist <text>']
handler.tags = ['owner']
handler.command = /^(-|del)playlist$/i

handler.owner = true

module.exports = handler