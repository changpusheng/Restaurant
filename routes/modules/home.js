const express = require('express')
const router = express.Router()
const restauramtData = require('../../models/restaurantMongoDB')


//建立首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  restauramtData.find({ userId }).lean().then(item => res.render('index', { item }))
    .catch(error => console.log('error:' + error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
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
  restauramtData.find({ userId }).sort(sortObject).lean().then(item => res.render('index', {
    item, sortOption
  })).catch(error => console.log('error:' + error))
})

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  restauramtData.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId }).then(() => res.redirect('/')).catch(error => console.log('error:' + error))
})

//建立搜尋頁面
router.get('/search', (req, res) => {
  const userId = req.user._id
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const searchKeyWordClear = req.query.keyword.trim().toLowerCase()
  const reg = RegExp(searchKeyWordClear, 'i')
  //利用資料庫mongodb語法去做篩選，$and、$or
  restauramtData.find({
    $and: [{ userId }, { $or: [{ name: reg }, { category: reg }] }]
  }).lean().then(item => {
    res.render('index', { item, searchKeyWordClear })
  }).catch(error => console.log('error:' + error))
})


module.exports = router