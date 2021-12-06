let fetch = require('node-fetch')
let winScore = 500

async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.sendButton(m.chat, 'Masih ada kuis yang belum terjawab!', wm, 'Nyerah', 'nyerah', this.game[id].msg)
        throw false
    }
    let res = await fetch(API('amel', '/game/family100', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
*soal:* ${json.result.soal}

terdapat *${json.result.jawaban.length}* jawaban${json.result.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)

+500 XP tiap jawaban benar
`: ''}
    `.trim()
    this.game[id] = {
        id,
        msg: await this.sendButton(m.chat, caption, wm, 'nyerah', 'nyerah', m),
        ...json,
        terjawab: Array.from(json.result.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^f(amily)?100$/i

handler.game = true

module.exports = handler