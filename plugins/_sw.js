let handler = m => m

handler.before = async function (m) {
    let user = db.data.users[m.sender]
    if (m.chat.endsWith('broadcast') && user.sw) {
        let to = db.data.settings[this.user.jid].tosw
        this.reply(to, `@${m.sender.split`@`[0]} baru saja membuat status`, 0)
        this.copyNForward(to, m).catch(e => console.log(e, m))
    }
}

module.exports = handler