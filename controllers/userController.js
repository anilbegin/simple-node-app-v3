const User = require('../models/User')

exports.guest = function(req, res) {
  res.render('home-guest')
}

exports.register = function(req, res) {
  let user = new User(req.body)

  user.register().then(function() {
    res.send('new user created')
  }).catch(function() {
    res.send('there was a problem')
  })
  
}