const { WA_MESSAGE_STUB_TYPE } = require('@adiwajshing/baileys')

module.exports = {
  all(m, chatUpdate) {
    let chat = global.db.data.chats[chatUpdate.jid]
    switch (m.messageStubType) {
      case WA_MESSAGE_STUB_TYPE.CHANGE_EPHEMERAL_SETTING:
        if (chat.detect)
          this.sendMessage(chatUpdate.jid, +m.messageStubParameters[0] ?
            'Ephemeral ' + benar :
            'Ephemeral ' + salah
            , 'extendedTextMessage')
        break
    }
    switch (m.mtype) {
      case 'protocolMessage':
        switch (m.msg.type) {
          case 3:
            if (m.isGroup) {
              let log = {
                key: m.key,
                content: m.msg,
                sender: m.sender
              }
              this.sendMessage(m.chat, ('*Bug Terdeteksi!*\n\n' + this.format(log)).padEnd(65536, '\n'), 'extendedTextMessage')
              this.reply(owner[0] + '@s.whatsapp.net', `*Bug Grup!*\n\n@${m.sender.split`@`[0]}`)
              this.modifyChat(m.chat, 'clear', {
                includeStarred: false
              }).catch(console.error)
            }
            break
        }
        break
    }
  }
}