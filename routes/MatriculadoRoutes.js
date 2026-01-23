const express = require('express')
const router = express.Router()
const MatriculadoController = require('../controllers/MatriculadoController')

router.post('/add', MatriculadoController.add)
router.get('/search', MatriculadoController.search)

module.exports = router