const express = require('express')
const router = express.Router()
const restauramtData = require('../../models/restaurantMongoDB')

//編輯頁面
router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  restauramtData.findOne({
    id, userId
  }).lean().then(item => {
    res.render('edit', { item })
  })
})

router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  const { category, location, phone, description } = req.body
  restauramtData.findOne({
    id, userId
  }).then(item => {
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
  const userId = req.user._id
  const id = req.params._id
  restauramtData.findOne({
    id, userId
  }).then(item => item.remove()).then(() => res.redirect('/'))
    .catch(error => console.log('error:' + error))
})

//建立個別詳細頁面
router.get('/:_id', (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  return restauramtData.findOne({
    id, userId
  }).lean().then(item => {
    res.render('show', { item })
  }).catch(error => console.log('error:' + error))
})

module.exports = router
