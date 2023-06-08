const User = require('../models/User')

exports.guest = function(req, res) {
  res.render('home-guest')
}

exports.register = function(req, res) {
  let user = new User(req.body)

  user.register()
  res.send('Thanks for attempting to register')
}