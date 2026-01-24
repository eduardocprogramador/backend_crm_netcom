const express = require('express')
const router = express.Router()
const MatriculadoController = require('../controllers/MatriculadoController')

router.post('/add', MatriculadoController.add)
router.get('/search', MatriculadoController.search)
router.get('/total_by_month', MatriculadoController.totalByMonth)
router.get('/total_by_course', MatriculadoController.totalByCourse)

module.exports = router