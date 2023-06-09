const express = require('express')
const router = express.Router()
const dataController = require('./controllers/dataController')

router.get('/', dataController.home)
router.post('/create-item', dataController.createItem)
router.post('/edit-item', dataController.editItem)
router.post('/delete-item',dataController.deleteItem)

module.exports = router