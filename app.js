const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const restauramtData = require('./restaurant.json')

//靜態文件
app.use(express.static('public'))

//npm express-handlebars 插件格式
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//建立首頁路由
app.get('/', (req, res) => {
  const restaurant = restauramtData.results
  res.render('index', { restaurant })
})

//建立個別詳細頁面路由
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurantObject = restauramtData.results.find(item => {
    if (item.id.toString() === id) { return item }
  })

  res.render('show', { restaurantObject })
})

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})