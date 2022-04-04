const bcrypt = require('bcryptjs/dist/bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FaceBookStrategy = require('passport-facebook').Strategy
const userDB = require('../models/userDB')

module.exports = app => {
  //1.初始化passport
  app.use(passport.initialize())
  app.use(passport.session())
  //2.選擇使用的策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    userDB.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false, req.flash('error', '帳號未註冊'))
      }
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return done(null, false, req.flash('error', '密碼錯誤'))
        }
        return done(null, user)
      })
    }).catch(err => done(err, false))
  }))

  passport.use(new FaceBookStrategy({
    clientID: process.env.Facebook_ID,
    clientSecret: process.env.Facebook_SECRET,
    callbackURL: process.env.Facebook_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    userDB.findOne({ email }).then(user => {
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt.genSalt(10).then(salt =>
        bcrypt.hash(randomPassword, salt)
      ).then(hash => userDB.create({
        name,
        email,
        password: hash
      })).then(user => done(null, user))
        .catch(err => done(err, false))
    })
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
