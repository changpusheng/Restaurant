const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')

app.use(express.static('public'))

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`This server is running on http://localhost:${port}.`)
})