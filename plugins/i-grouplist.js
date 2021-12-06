let handler = async (m, { conn }) => {
  let txt = conn.chats.all().filter(v => v.jid.endsWith('g.us')).map(v => `
${conn.getName(v.jid)}\n${v.jid} [${v.read_only ? 'keluar' : 'masuk'}]\n${db.data.chats[v.jid] == undefined ? db.data.chats[v.jid] = {
      isBanned: false,
      welcome: true,
      detect: true,
      sWelcome: '',
      sBye: '',
      sPromote: '',
      sDemote: '',
      antiLink: true,
      autoread: false,
      broadcast: true,
      clear: false,
      clearTime: (new Date() * 1) + 3600000 * 1,
      delete: true,
      desc: true,
      download: true,
      getmsg: false,
      groupTime: 0,
      stiker: false,
      viewonce: true,
    } : db.data.chats[v.jid].groupTime ? conn.msToDate(db.data.chats[v.jid].groupTime - new Date() * 1) : 'belum diatur'}
${db.data.chats[v.jid].clear ? '✅' : '❌'} Auto Clear
${db.data.chats[v.jid].autoread ? '✅' : '❌'} Auto Read 
    `.trim()).join`\n\n`
  conn.reply(m.chat, txt, m)
}
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(group(s|list))$/i

handler.owner = true

module.exports = handler