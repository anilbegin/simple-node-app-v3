const User = require('../models/User')

exports.guest = function(req, res) {
  res.render('home-guest')
}

exports.register = function(req, res) {
  let user = new User(req.body)

  user.register()
  if(user.errors.length) {
    res.send(user.errors)
  } else {
    res.send('thanks for trying to register')
  }
  
}

exports.login = function(req, res) {
  res.send('thanks for trying to login')
}

exports.logout = function(req, res) {
  res.send('thanks for the logout attempt')
}