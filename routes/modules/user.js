const express = require('express')
const router = express.Router()
const userDB = require('../../models/userDB')
const passport = require('passport')
const bcrpty = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login', { layout: false })
})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureFlash: true, failureRedirect: '/user/login' }))

router.get('/register', (req, res) => {
  res.render('register', { layout: false })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      layout: false,
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  userDB.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        layout: false,
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrpty.genSalt(10).then(salt => bcrpty.hash(password, salt))
      .then(hash => userDB.create({
        name,
        email,
        password: hash
      }))
  }).then(() => res.redirect('/user/login'))
    .catch(err => console.log('err:' + err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功!')
  res.redirect('/user/login')
})

module.exports = router