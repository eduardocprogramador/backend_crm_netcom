const express = require('express')
const router = express.Router()
const InteressadoController = require('../controllers/InteressadoController')

router.post('/add', InteressadoController.add)
router.get('/search', InteressadoController.search)
router.get('/total_by_month', InteressadoController.totalByMonth)
router.get('/total_by_source', InteressadoController.totalBySource)

module.exports = router