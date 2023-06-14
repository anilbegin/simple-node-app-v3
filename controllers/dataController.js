let sanitizeHTML = require('sanitize-html')
const Data = require('../models/Data')

exports.createItem = function(req, res) {
  let safeText = sanitizeHTML(req.body.item, {allowedTags: [], allowedAttributes: {}})
  let data = new Data(safeText, req.session.user._id)
  data.createNote().then((result) => {
  //  res.redirect('/') // used during generic form submit
     res.json(result)
  }).catch((err) => {
    console.log(err)
  })
}


exports.editItem = function(req, res) {
  let safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
  let data = new Data(safeText, req.session.user._id, req.body.id)
  data.editNote().then((result) => {
   // res.redirect('/')
   // console.log(result)
      res.json(result)
  }).catch(() => {
    res.send('there is a problem')
  })
}

exports.deleteItem = function(req, res) {
  let data = new Data(req.body.text, req.session.user._id, req.body.id)
  data.deleteNote().then(() => {
    res.redirect('/')
  }).catch(() => {
    res.send('there is a problem')
  })
}