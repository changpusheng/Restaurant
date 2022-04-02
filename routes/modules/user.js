const express = require('express')
const router = express.Router()
const userDB = require('../../models/userDB')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login', { layout: false })
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/user/login' }), (req, res) => {
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register', { layout: false })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  userDB.findOne({ email }).then(item => {
    if (item) {
      console.log('已存在用戶')
      res.render('/register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return userDB.create({
        name,
        email,
        password
      })
    }
  }).then(() => res.redirect('/user/login'))
    .catch(err => console.log('err:' + err))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router