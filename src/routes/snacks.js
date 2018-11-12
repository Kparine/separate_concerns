//INITIALIZE EXPRESS
const express = require('express')
const snackControl = require('../controllers/snacks.js')

//CREATE ROUTER
const router = express.Router()

//ADD THE ROUTES
router.post('/', snackControl.create)
router.get('/', snackControl.getAll)
router.get('/:id', snackControl.getOne)
router.delete('/:id', snackControl.remove)
router.put('/:id', snackControl.update)

module.exports = router