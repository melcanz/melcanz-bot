let handler = async (m, { conn }) => {
    if (!m.quoted) throw `balas pesan viewOnce nya!`
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'yang kamu balas bukan pesan viewOnce'
    let { key } = await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.quoted.id), false, { readViewOnce: true }).catch(_ => m.reply('mungkin udah dibuka sama bot'))
}
handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^(read)?viewonce/i

module.exports = handler