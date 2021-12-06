let handler = async (m, { conn, participants, groupMetadata }) => {

    const getGroupAdmins = (participants) => {
        admins = []
        for (let i of participants) {
            i.isAdmin ? admins.push(i.jid) : ''
        }
        return admins
    }

    let ogc = participants.find(v => v.isSuperAdmin)
    let ownergc = ogc.jid

    let pp = './src/avatar_contact.png'
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { sWelcome, sBye, sPromote, sDemote, groupTime, deletemedia, deletemediaTime } = global.db.data.chats[m.chat]
        const groupAdmins = getGroupAdmins(participants)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let text = `*「 Informasi Grup 」*\n
*Jid:* ${groupMetadata.id}

*Nama:* ${groupMetadata.subject}${groupMetadata.desc ? '\n\n*Description:* ' + groupMetadata.desc : ''}

*Total Anggota:* ${participants.length} Anggota

*Owner:* @${ownergc.split`@`[0]}

*Admin:*
${listAdmin}

*Pesan:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}

*Kedaluarsa:* ${groupTime ? conn.msToDate(groupTime - new Date() * 1) : 'belum diatur'}
`.trim()
        let mentionedJid = groupAdmins.concat(ownergc)
        await conn.sendFile(m.key.remoteJid, pp, 'pp.jpg', text, m, 0, { contextInfo: { mentionedJid } })
    }
}
handler.help = ['infogc']
handler.tags = ['group']
handler.command = /^(g(c|ro?up)info|info(gro?up|gc))$/i

handler.group = true

module.exports = handler