const express = require('express')
let app = express()
const router = require('./router')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)


module.exports = app