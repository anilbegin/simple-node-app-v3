const express = require('express')
const router = express.Router()
const dataController = require('./controllers/dataController')
const userController = require('./controllers/userController')

// notes related routes
router.get('/mynotes', dataController.myNotes)
router.post('/create-item', dataController.createItem)
router.post('/edit-item', dataController.editItem)
router.post('/delete-item',dataController.deleteItem)

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router