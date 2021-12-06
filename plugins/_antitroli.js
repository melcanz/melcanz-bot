let handler = m => m

handler.all = async function (m) {
    if (m.message && m.isBaileys && m.quoted && m.quoted.mtype === 'orderMessage' && !(m.quoted.token && m.quoted.orderId) && db.data.settings[this.user.jid].antitroli) {
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
    }
}

module.exports = handler