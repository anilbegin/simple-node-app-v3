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
    let errors = Object.assign({}, ...user.errors)
    // console.log(errors)
    res.json(errors)
  } else {
   // res.send('thanks for trying to register')
   res.json("Success")
  }
  
}

exports.login = function(req, res) {
  let user = new User(req.body)
  
  user.login().then((result) => {
    req.session.user = {username: user.data.username, _id: user.data._id}
    req.session.save(function() {
      res.json(result)
     // res.redirect('/')  // this is for back-end login execution
    })
  }).catch((err) => {
    // res.send(err)
    // back-send attaching errors to req.session.flash..
    /*
    req.flash('errors', err) // req.session.flash.errors = []
    req.session.save(function() {
      res.redirect('/')
    })
    */
    // end of backend section setting n send req.session.flash
    res.json(err)
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