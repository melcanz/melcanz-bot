let fs = require('fs')
let chalk = require('chalk')

global.owner = ['6281217252309', '6281217252309']
global.mods = []

global.APIs = {
  amel: 'https://melcanz.com',
}
global.APIKeys = {
  'https://melcanz.com': 'trial',
}

global.packname = 'ig @ariffb.id @melcanz.io'
global.author = '© ariffb & melcanz'
global.wm = '© ariffb & melcanz'
global.eror = '*Error*'
global.wait = '*tunggu..*'
global.benar = '✅'
global.salah = '❌'
global.dikit = 'dikit lagi'
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("memperbaharui 'config.js'"))
  delete require.cache[file]
  require(file)
})
