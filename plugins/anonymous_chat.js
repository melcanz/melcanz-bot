async function handler(m, { command }) {
    if (!global.db.data.settings[this.user.jid].anon) {
        await this.sendButton(m.chat, 'anonymous chat belum diaktifkan', wm, 'aktifkan', '.1 anon', m)
        throw 0
    }
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendButton(m.chat, '_kamu tidak sedang berada di anonymous chat_', wm, 'cari partner', `.start`, m)
                throw 0
            }
            m.reply('_Ok_')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '_partner meninggalkan chat_', wm, 'cari partner', `.start`)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendButton(m.chat, '_kamu masih berada di dalam anonymous chat, menunggu partner_', wm, 'keluar', `.leave`, m)
                throw 0
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '_partner ditemukan!_', wm, 'next', `.next`)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.b, '_partner ditemukan!_', wm, 'next', `.next`)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '_menunggu partner..._', wm, 'keluar', `.leave`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

module.exports = handler