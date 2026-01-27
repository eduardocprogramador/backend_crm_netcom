const Matriculado = require('../models/Matriculado')
const getTodayDate = require('../utils/getTodayDate')
const capitalize = require('../utils/capitalize')
const getMatriculadosOrInteressados = require('../utils/getMatriculadosOrInteressados')
const totalByMonth = require('../utils/totalByMonth')

class MatriculadoController {
    static async add(req, res) {
        let { name, phone, category, course } = req.body
        category = category.toString()
        if (!name || !phone || !category || !course) {
            return res.status(422).json({
                message: 'Preencha todos os campos'
            })
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
    static async delete(req, res) {
        const { id } = req.params
        try {
            const matriculado = await Matriculado.findByPk(id)
            await matriculado.destroy()
            return res.json({ message: "Matriculado removido" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover matriculado" })
        }
    }
    static async getById(req, res) {
        const { id } = req.params
        try {
            const matriculado = await Matriculado.findByPk(id)
            return res.json({ matriculado })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao encontrar matriculado" })
        }
    }
    static async update(req, res) {
        const { id } = req.params
        let { name, phone, category, course } = req.body
        category = category.toString()
        if (!name || !phone || !category || !course) {
            return res.status(422).json({
                message: 'Preencha todos os campos'
            })
        }
        try {
            await Matriculado.update(
                { name, phone, category, course },
                { where: { id } }
            )
            const matriculado = await Matriculado.findByPk(id)
            return res.json({ 
                matriculado,
                message: 'Matriculado atualizado' 
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Erro ao atualizar matriculado'
            })
        }
    }
    static async totalByMonth(req, res) {
        try {
            const { initialDate, finalDate } = req.query
            let { result: matriculados, total } = await totalByMonth(
                Matriculado, initialDate, finalDate
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
    static async totalByCourse(req, res) {
        try {
            const { initialDate, finalDate } = req.query
            const { totalByCourse, total } = await getTotalMatriculadosByCourse(
                initialDate, finalDate
            )
            return res.json({ totalByCourse, total })
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