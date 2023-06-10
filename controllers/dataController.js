const Data = require('../models/Data')


exports.createItem = async function(req, res) {
  let data = new Data(req.body.item, req.session.user._id)
  data.createNote().then(() => {
    res.redirect('/')
  }).catch(() => {
    res.send('404 template')
  })
}

exports.editItem = function(req, res) {
  res.send('this.edit item')
}

exports.deleteItem = function(req, res) {
  res.send('this is delete item')
}