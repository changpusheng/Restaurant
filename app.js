const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const restauramtData = require('./models/restaurantMongoDB')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')


//資料庫連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => { console.log('mongoose error!') })

db.once('open', () => {
  console.log('mongoose connected!')
})

//靜態文件,中介插件(middleware)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//npm express-handlebars 插件格式
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//首頁重構
app.use(router)

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})