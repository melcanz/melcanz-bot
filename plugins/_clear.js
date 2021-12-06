let handler = m => m

handler.before = async function (m) {
    let chat = db.data.chats[m.chat]
    if (chat.clearTime != 0 && chat.clear) {
        if (new Date() * 1 >= chat.clearTime) {
            await this.modifyChat(m.chat, 'clear', {
                includeStarred: false
            }).catch(console.log)
            chat.clearTime = new Date() * 1 + 3600000 * 1
            console.log(`jid: ${m.chat} | ${this.getName(m.chat)}\nsemua pesan dihapus `)
        }
    }
}

module.exports = handler