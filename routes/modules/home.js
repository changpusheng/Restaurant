const express = require('express')
const tr = require('transliteration')
const router = express.Router()
const restauramtData = require('../../models/restaurantMongoDB')


//建立首頁
router.get('/', (req, res) => {
  restauramtData.find().lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  restauramtData.create({ name, name_en, category, image, location, phone, google_map, rating, description }).then(() => res.redirect('/')).catch(error => console.log('error:' + error))
})

//建立搜尋頁面
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const searchKeyWord = req.query.keyword
  const searchKeyWordClear = req.query.keyword.trim().toLowerCase()
  const reg = RegExp(searchKeyWord, 'i')
  //利用資料庫mongodb語法去做篩選，$and、$or
  restauramtData.find({ $or: [{ name: reg }, { category: reg }] }).lean().then(item => {
    res.render('index', { item, searchKeyWord })
  }).catch(error => console.log('error:' + error))
})

router.post('/', (req, res) => {
  const sortOption = req.body.sort
  let sortObject
  switch (sortOption) {
    case '1': sortObject = { name: 'asc' }
      break;
    case '2': sortObject = { name: 'desc' }
      break;
    case '3': sortObject = { category: 'desc' }
      break;
    case '4': sortObject = { location: 'desc' }
      break;
    default:
      sortObject = { _id: 'asc' }
  }
  restauramtData.find().sort(sortObject).lean().then(item => res.render('index', {
    item, sortOption
  })).catch(error => console.log('error:' + error))
})

module.exports = router