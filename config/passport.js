const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userDB = require('../models/userDB')

module.exports = app => {
  //1.初始化passport
  app.use(passport.initialize())
  app.use(passport.session())
  //2.選擇使用的策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    userDB.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false, { message: '帳號為註冊' })
      }
      if (user.password !== password) {
        return done(null, false, { message: '密碼或帳號錯誤' })
      }
      return done(null, user)
    }).catch(err => done(err, false))
  }))
  //3.序列、反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    userDB.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
