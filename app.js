const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

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
app.use(flash())
usePassport(app)
require('./config/mongoose')

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


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