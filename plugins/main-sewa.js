let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
    pepe = await conn.getProfilePicture('62831287340122@s.whatsapp.net').catch(() => 'https://i.ibb.co/jr9Nh6Q/Thumb.jpg')
    baper = await fetch(pepe).then(a => a.buffer())
    let listMessage = {
        "title": "Melcanz-Bot",
        "description": `
Melcanz PRICE
        
1 Grup / 30 Hari
Rp. 15,000 Dana, Ovo
Rp. 20,000 Pulsa Axis/XL

1 Premium / sampai pensi
Rp. 20,000 Dana, Ovo
Rp. 25,000 Pulsa Axis/XL
`.trim(),
        "listType": "PRODUCT_LIST",
        "productListInfo": {
            "productSections": [
                {
                    "title": "Klik untuk melihat harga",
                    "products": [
                        {
                            "productId": "4696956640315324"
                        }
                    ]
                }
            ],
            "headerImage": {
                "productId": "4696956640315324",
                "jpegThumbnail": baper
            },
            "businessOwnerJid": "6283128734012@s.whatsapp.net"
        },
        "footerText": "hubungi wa.me/6283128734012 atau wa.me/6287755080455"
    }


    conn.sendMessage(m.chat, listMessage, 'listMessage', { quoted: m })
}
handler.help = ['sewabot']
handler.tags = ['main']
handler.command = /^sewa(bot|melcanz)$/i

module.exports = handler
