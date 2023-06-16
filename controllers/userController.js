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
   // res.render('home-guest', {errors: req.flash('errors')}) // can be used for flash error for login
   res.render('home-guest', {regErrors: req.flash('regErrors')})
   }
}

exports.register = async function(req, res) {
  let user = new User(req.body)

await user.register()
  if(user.errors.length) {
    //res.send(user.errors)
    user.errors.forEach(function(error) {
      req.flash('regErrors', error) // flash is going to adjust session data in db
    })
    req.session.save(function() {
      res.redirect('/')
    })
  } else {
    res.send('thanks for trying to register')
   //res.json("Success") // could be used for Front-end Js later
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