let handler = async (m, { conn }) => {
  conn.reply(m.chat, `${conn.pickRandom(['ya', 'mungkin iya', 'ga tau', 'mungkin tidak', 'tidak', 'tidak mungkin'])}
`.trim(), m)
}
handler.help = ['apakah <teks>']
handler.tags = ['kerang']
handler.command = /^apakah$/i

module.exports = handler