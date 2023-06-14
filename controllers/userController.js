const User = require('../models/User')
const Data = require('../models/Data')

exports.home = async function(req, res) {
  if(req.session.user) {
      Data.findByUserId(req.session.user._id).then(function(posts) {
      res.render('notes', {itemy: posts})
      }).catch(function() {
        res.send('404 template')
      })
   } else {
    res.render('home-guest', {errors: req.flash('errors')})
   }
}

exports.register = async function(req, res) {
  let user = new User(req.body)

await user.register()
  if(user.errors.length) {
    res.send(user.errors)
  } else {
    res.send('thanks for trying to register')
  }
  
}

exports.login = function(req, res) {
  let user = new User(req.body)
  
  user.login().then((result) => {
    req.session.user = {username: user.data.username, _id: user.data._id}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch((err) => {
    // res.send(err)
    req.flash('errors', err) // req.session.flash.errors = []
    req.session.save(function() {
      res.redirect('/')
    })
    
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/')
  })
}

/*
exports.allItemsByUser = function(req, res) {
  // posts specific to the userId
  Data.findByUserId(req.session.user._id).then(function(posts) {
   res.render('notes', {itemy: posts})
  }).catch(function() {
    res.send('404 template')
  })
}
*/