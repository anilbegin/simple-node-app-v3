const User = require('../models/User')
const Data = require('../models/Data')

exports.home = async function(req, res) {
  if(req.session.user) {
    try {
      let itemy = await Data.fetchNotes()
      res.render('notes', {itemy})
    } catch {
      res.send('404 template show here')
    }
   } else {
    res.render('home-guest')
   }
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
  let user = new User(req.body)
  
  user.login().then((result) => {
    req.session.user = {username: user.data.username, _id: user.data._id}
    res.send(result)
  }).catch((err) => {
    res.send(err)
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/')
  })
}