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

//建立首頁
app.get('/', (req, res) => {
  const restaurant = restauramtData
  restauramtData.find().lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})

//建立個別詳細頁面
app.get('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  return restauramtData.findById(id).lean().then(item => {
    res.render('show', { item })
  }).catch(error => console.log('error:' + error))
})

//建立搜尋頁面
app.get('/search', (req, res) => {
  const searchKeyWord = req.query.keyword
  const reg = new RegExp(searchKeyWord, 'i')
  restauramtData.find({ name: reg }).lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})

//編輯頁面
app.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  restauramtData.findById(id).lean().then(item => {
    res.render('edit', { item })
  })
})

app.post('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  const { category, location, phone, description } = req.body
  restauramtData.findById(id).then(item => {
    item.category = category
    item.location = location
    item.phone = phone
    item.description = description
    return item.save()
  }).then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log('error:' + error))
})

//新增餐廳
app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  return restauramtData.create(req.body).then(() => res.redirect('/')).catch(error => console.log('error:' + error))
})

//移除餐廳
app.post('/restaurants/:_id/delete', (req, res) => {
  const id = req.params._id
  restauramtData.findById(id).then(item => item.remove()).then(() => res.redirect('/'))
    .catch(error => console.log('error:' + error))
})

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})