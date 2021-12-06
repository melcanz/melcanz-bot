module.exports = Object.assign(async function handler(m, { text, command, usedPrefix }) {
    if (!text) throw `uhm.. teksnya mana?\n\nexample:\n${usedPrefix + command} tes`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) return await conn.sendButton(m.chat, `'${text}' tidak terdaftar!`, wm, 'daftar semua pesan', '.listall', m)
    msgs[text].locked = !/^un/i.test(command)
    m.reply('berhasil dikunci!')
}, {
    rowner: true,
    help: ['un', ''].map(v => v + 'lockmsg <teks>'),
    tags: ['database'],
    command: /^(un)?lock(vn|msg|video|audio|img|stic?ker|gif)$/i
})
