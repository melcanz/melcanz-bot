let handler = async (m) => {
    m.reply(`
┌「 *donasi* 」
├ https://saweria.co/ariffb
├ https://saweria.co/ameys
├ https://trakteer.id/ariffb/tip
└────
`.trim())
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler