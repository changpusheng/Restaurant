//資料庫連線
if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const mongodbURI = process.env.restaurantDB_URI
mongoose.connect(mongodbURI)

const db = mongoose.connection

db.on('error', () => { console.log('mongoose error!') })

db.once('open', () => {
  console.log('mongoose connected!')
})

module.exports = db