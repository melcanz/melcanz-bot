let handler = m => m

handler.before = async function (m, { isBotAdmin }) {
    if (m.isGroup) if (!isBotAdmin) return
    try {
        if (m.msg.contextInfo.expiration != 604800) {
            return
        }
        else if (m.msg.contextInfo.expiration != 0) {
            await this.toggleDisappearingMessages(m.chat, 0)
        } else return
    } catch (e) {
        return
    }
}

module.exports = handler