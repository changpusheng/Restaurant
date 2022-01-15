const express = require('express')
const router = express.Router()
const restauramtData = require('../../models/restaurantMongoDB')

//編輯頁面
router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  restauramtData.findById(id).lean().then(item => {
    res.render('edit', { item })
  })
})

router.put('/:_id', (req, res) => {
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

//移除餐廳
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  restauramtData.findById(id).then(item => item.remove()).then(() => res.redirect('/'))
    .catch(error => console.log('error:' + error))
})

//建立個別詳細頁面
router.get('/:_id', (req, res) => {
  const id = req.params._id
  return restauramtData.findById(id).lean().then(item => {
    res.render('show', { item })
  }).catch(error => console.log('error:' + error))
})

module.exports = router
