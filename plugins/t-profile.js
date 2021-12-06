let PhoneNumber = require('awesome-phonenumber')

let handler = async (m, { conn, text }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
  if (typeof db.data.users[who] == 'undefined') {
    db.data.users[who] = {
      exp: 0,
      limit: 10,
      registered: false,
      name: conn.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      autolevelup: false,
      banned: false,
      level: 0,
      premium: false,
      premiumTime: 0,
      role: '',
      sw: false,
    }
  }
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, registered, regTime, age, banned, premium, premiumTime, role } = global.db.data.users[who]
    let username = conn.getName(who)
    let str = `
Nama: ${username} ${registered ? '(' + name + ') ' : ''}(@${who.replace(/@.+/, '')})${about != 401 ? '\nInfo: ' + about : ''}
Nomor: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
Link: https://wa.me/${who.split`@`[0]}${registered ? '\nUmur: ' + age : ''}
XP: ${exp}
Limit: ${limit}
Role: ${role}
Daftar: ${registered ? '✅' : '❌'}
Premium: ${premium ? `✅\nPremium Expired: ${conn.msToDate(premiumTime - new Date() * 1)}` : '❌'}
Banned: ${banned ? '✅' : '❌'}
`.trim()
    await conn.sendFile(m.chat, pp, 'pp.jpg', str, m)
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile?$/i

module.exports = handler