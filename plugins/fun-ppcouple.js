let fetch = require('node-fetch')

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(API('amel', '/ppcouple', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
conn.sendFile(m.chat, json.cowo, json.cowo, 'cowo',m)
conn.sendFile(m.chat, json.cewe, json.cewe, 'cewe',m)
}
handler.help = ['ppcp']
handler.tags = ['fun']
handler.command = /^(pp(cp|couple))$/i

module.exports = handler