const express = require('express')
const router = express.Router()
const InteressadoController = require('../controllers/InteressadoController')
const checkToken = require('../utils/checkToken')

router.post('/add', checkToken, InteressadoController.add)
router.get('/search', checkToken, InteressadoController.search)
router.get('/total_by_month', InteressadoController.totalByMonth)
router.get('/total_by_source', InteressadoController.totalBySource)

module.exports = router