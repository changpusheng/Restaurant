module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請輸入帳號密碼!')
    res.redirect('/user/login')
  }
}