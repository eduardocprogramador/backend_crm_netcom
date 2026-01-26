const express = require('express')
const router = express.Router()
const MatriculadoController = require('../controllers/MatriculadoController')
const checkToken = require('../utils/checkToken')

router.post('/add', checkToken, MatriculadoController.add)
router.get('/search', checkToken, MatriculadoController.search)
router.delete('/:id', checkToken, MatriculadoController.delete)
router.patch('/:id', checkToken, MatriculadoController.update)
router.get('/total_by_month', checkToken, MatriculadoController.totalByMonth)
router.get('/total_by_course', MatriculadoController.totalByCourse)
router.get('/matriculado/:id', checkToken, MatriculadoController.getById)

module.exports = router