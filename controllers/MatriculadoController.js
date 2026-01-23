const Matriculado = require('../models/Matriculado')
const getTodayDate = require('../utils/getTodayDate')
const capitalize = require('../utils/capitalize')
const getMatriculadosOrInteressados = require('../utils/getMatriculadosOrInteressados')

class MatriculadoController {
    static async add(req, res) {
        let { name, phone, category, course } = req.body
        category = category.toString()
        if (!name || !phone || !category || !course) {
            res.status(422).json({
                message: 'Preencha todos os campos'
            })
            return
        }
        const matriculadoExists = await Matriculado.findOne({ where: { phone } })
        if (matriculadoExists) {
            return res.status(422).json({
                message: 'Matriculado já existe'
            })
        }
        try {
            const matriculado = await Matriculado.create({
                name: capitalize(name), phone, category, course, date: getTodayDate()
            })
            return res.status(201).json({
                message: 'Matriculado cadastrado',
                data: matriculado
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Erro ao cadastrar matriculado'
            })
        }
    }
    static async search(req, res) {
        try {
            const { initialDate, finalDate, name, category, course } = req.query
            const { result: matriculados, total } = await getMatriculadosOrInteressados(
                Matriculado, initialDate, finalDate, name, category, course
            )
            return res.json({ matriculados, total })
        } catch (error) {
            console.error(error)
            if (error.status == 422) {
                return res.status(422).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Erro ao buscar matriculados' })
        }
    }
}

module.exports = MatriculadoController