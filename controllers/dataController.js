const Data = require('../models/Data')


exports.myNotes = async function(req, res) {
  try {
    let itemy = await Data.fetchNotes()
    res.render('notes', {itemy})
  } catch {
    res.send('404 template show here')
  }
}


exports.createItem = async function(req, res) {
  let data = new Data(req.body.item)
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