const express = require('express')
const router = express.Router()
const InteressadoController = require('../controllers/InteressadoController')
const checkToken = require('../utils/checkToken')

router.post('/add', checkToken, InteressadoController.add)
router.get('/search', checkToken, InteressadoController.search)
router.delete('/:id', checkToken, InteressadoController.delete)
router.patch('/:id', checkToken, InteressadoController.update)
router.get('/total_by_month', checkToken, InteressadoController.totalByMonth)
router.get('/total_by_source', InteressadoController.totalBySource)
router.get('/:id', checkToken, InteressadoController.getById)

module.exports = router