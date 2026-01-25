const express = require('express')
const router = express.Router()
const MatriculadoController = require('../controllers/MatriculadoController')
const checkToken = require('../utils/checkToken')

router.post('/add', checkToken, MatriculadoController.add)
router.get('/search', checkToken, MatriculadoController.search)
router.delete('/:id', MatriculadoController.delete)
router.get('/total_by_month', MatriculadoController.totalByMonth)
router.get('/total_by_course', MatriculadoController.totalByCourse)

module.exports = router