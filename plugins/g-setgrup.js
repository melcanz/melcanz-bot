let handler = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = {
		'open': false,
		'buka': false,
		'on': false,
		'1': false,
		'close': true,
		'tutup': true,
		'off': true,
		'0': true,
	}[(args[0] || '')]
	if (isClose === undefined) {
		await conn.send2Button(m.chat, `
contoh:
${usedPrefix + command} buka
${usedPrefix + command} tutup
`.trim(), wm, 'buka', '.gr 1', 'tutup', '.gr 0', m)
		throw 0
	}
	await conn.groupSettingChange(m.chat, 'announcement', isClose)
}
handler.help = ['group <buka/tutup>']
handler.tags = ['group']
handler.command = /^(gr|gro?up)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler