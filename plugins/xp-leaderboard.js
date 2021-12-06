let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  let sortedLev = users.map(toNumber('level')).sort(sort('level'))
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLev = sortedLev.map(enumGetKey)
  console.log(participants)
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 3)) : Math.min(1, sortedExp.length)
  let text = `
┌「 *XP Leaderboard Top ${len}* 」
├ kamu: *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*
│ 
${sortedExp.slice(0, len).map(({ jid, exp }, i) => `├ ${i + 1}. ${participants.some(p => jid === p.jid) ? `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}` : `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}`} *${exp} Exp*`).join`\n`}
└────
┌「 *Limit Leaderboard Top ${len}* 」
├ kamu: *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*
│ 
${sortedLim.slice(0, len).map(({ jid, limit }, i) => `├ ${i + 1}. ${participants.some(p => jid === p.jid) ? `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}` : `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}`} *${limit} Limit*`).join`\n`}
└────
┌「 *Level Leaderboard Top ${len}* 」
├ kamu: *${usersLev.indexOf(m.sender) + 1}* dari *${usersLev.length}*
│ 
${sortedLev.slice(0, len).map(({ jid, level }, i) => `├ ${i + 1}. ${participants.some(p => jid === p.jid) ? `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}` : `${db.data.users[jid] ? db.data.users[jid].name : conn.getName(jid)}`} *Level ${level}*`).join`\n`}
└────
`.trim()
  await conn.reply(m.chat, text, m)
}
handler.help = ['leaderboard [number]', 'lb [number]']
handler.tags = ['xp']
handler.command = /^(leaderboard|lb)$/i

module.exports = handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
