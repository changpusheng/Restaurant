const express = require('express')
const router = express.Router()
const restauramtData = require('../../models/restaurantMongoDB')

//建立首頁
router.get('/', (req, res) => {
  const restaurant = restauramtData
  restauramtData.find().lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  return restauramtData.create(req.body).then(() => res.redirect('/')).catch(error => console.log('error:' + error))
})

//建立搜尋頁面
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const searchKeyWord = req.query.keyword
  const searchKeyWordClear = req.query.keyword.trim().toLowerCase()
  const reg = RegExp(searchKeyWord, 'i')
  //第二種利用資料庫mongodb語法去做篩選，$and、$or
  restauramtData.find({ $or: [{ name: reg }, { category: reg }] }).lean().then(item => {
    res.render('index', { item, searchKeyWord })
  }).catch(error => console.log('error:' + error))

  //第一種方法全部資料去做篩選
  // const itemFilter = item.filter(data => data.name.toLowerCase().includes(searchKeyWordClear) ||
  //   data.category.toLowerCase().includes(searchKeyWordClear))
  // res.render('index', { item: itemFilter, searchKeyWord })
})

module.exports = router