const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')

//部屬到線上NODE.ENV會被設定為production
if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.Port

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
//引入mongoose on config
require('./config/mongoose')

//靜態文件,中介插件(middleware)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//npm express-handlebars 插件格式
//使用express-handlebar helpers 
app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: {
    selected: function (a, b) {
      if (Number(a) === b) {
        return 'selected'
      } else {
        return ''
      }
    }
  }
}))
app.set('view engine', 'handlebars')


//首頁重構
app.use(router)

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})