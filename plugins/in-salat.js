const sholatAll = require('../lib/salat')
let axios = require('axios')
let cheerio = require('cheerio')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. kota apa?\n\n${usedPrefix + command} jakarta barat`
    let lcity = await city().then(res => { return res })
    let c = text.replace(' ', '-').toUpperCase()
    if (!lcity.includes(c)) return m.reply('kota tidak ditemukan!' + readMore + '\n\n' + lcity.map((v, i) => `${i + 1}. ${v}`).join`\n`)
    let json = await sholatAll(text).then(async res => {
        let data = JSON.stringify(res)
        let json = JSON.parse(data)
        return json
    })
    m.reply(`
┌「 ${c} 」
├ tanggal: ${json.data.tanggal}
├ ${json.data.subuh} : Subuh
├ ${json.data.duha} : Dhuha
├ ${json.data.zuhur} : Dzuhur
├ ${json.data.ashar} : Ashar
├ ${json.data.magrib} : Mahgrib
├ ${json.data.isya} : Isya
└────`.trim())
}
handler.help = ['salat'].map(v => v + ' <kota>')
handler.tags = ['internet']
handler.command = /^(salat)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function city() {
    return new Promise(async (resolve, reject) => {
        let html = await (await axios.get('https://m.dream.co.id/jadwal-salat/ambon/')).data
        $ = cheerio.load(html)
        let collect = []
        $('select > option').each(function (i, e) {
            data = $($(e)).text()
            collect.push(data)
        })
        resolve(collect)
    })
}