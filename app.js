const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const restauramtData = require('./models/restaurantMongoDB')
const bodyParser = require('body-parser')

//資料庫連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => { console.log('mongoose error!') })

db.once('open', () => {
  console.log('mongoose connected!')
})

//靜態文件
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//npm express-handlebars 插件格式
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//建立首頁路由
app.get('/', (req, res) => {
  const restaurant = restauramtData
  restauramtData.find().lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error!'))
})

//建立個別詳細頁面路由
app.get('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return restauramtData.findById(id).lean().then(item => {
    res.render('show', { item })
  }).catch(error => console.log('error!'))
})

//建立搜尋頁面路由
app.get('/search', (req, res) => {
  const searchKeyWord = req.query.keyword
  const reg = new RegExp(searchKeyWord, 'i')
  restauramtData.find({ name: reg }).lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})
app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})