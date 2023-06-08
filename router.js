const express = require('express')
const router = express.Router()
const dataController = require('./controllers/dataController')
const userController = require('./controllers/userController')

router.get('/', dataController.home)
router.get('/guest', userController.guest)
router.post('/register', userController.register)
router.post('/create-item', dataController.createItem)
router.post('/edit-item', dataController.editItem)
router.post('/delete-item',dataController.deleteItem)

module.exports = router