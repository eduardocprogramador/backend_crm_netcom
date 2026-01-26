const Interessado = require('../models/Interessado')
const getTodayDate = require('../utils/getTodayDate')
const capitalize = require('../utils/capitalize')
const getMatriculadosOrInteressados = require('../utils/getMatriculadosOrInteressados')
const totalByMonth = require('../utils/totalByMonth')
const getTotalInteressadosBySource = require('../utils/getTotalInteressadosBySource')
const getToken = require('../utils/getToken')
const getUserByToken = require('../utils/getUserByToken')

class InteressadoController {
    static async add(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        let { name, phone, category, course, source, email, obs } = req.body
        category = category.toString()
        const attendant = user.name
        if (!name || !phone || !category || !course) {
            return res.status(422).json({
                message: 'Preencha os campos obrigatórios'
            })
        }
        const interessadoExists = await Interessado.findOne({ where: { phone } })
        if (interessadoExists) {
            return res.status(422).json({
                message: 'Interessado já existe'
            })
        }
        try {
            const interessado = await Interessado.create({
                name: capitalize(name), phone, category, course,
                date: getTodayDate(), source, email, attendant, obs
            })
            return res.status(201).json({
                message: 'Interessado cadastrado',
                data: interessado
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Erro ao cadastrar interessado'
            })
        }
    }
    static async search(req, res) {
        try {
            const { initialDate, finalDate, name, category, course } = req.query
            const { result: interessados, total } = await getMatriculadosOrInteressados(
                Interessado, initialDate, finalDate, name, category, course
            )
            return res.json({ interessados, total })
        } catch (error) {
            console.error(error)
            if (error.status == 422) {
                return res.status(422).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Erro ao buscar interessados' })
        }
    }
    static async delete(req, res) {
        const { id } = req.params
        try {
            const interessado = await Interessado.findByPk(id)
            await interessado.destroy()
            return res.json({ message: "Interessado removido com sucesso" })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover interessado" })
        }
    }
    static async getById(req, res) {
        const { id } = req.params
        try {
            const interessado = await Interessado.findByPk(id)
            return res.json({ interessado })
        } catch (error) {
            return res.status(500).json({ message: "Erro ao encontrar interessado" })
        }
    }
    static async update(req, res) {
        const { id } = req.params
        let { name, phone, category, course, email, source, obs } = req.body
        category = category.toString()
        if (!name || !phone || !category || !course) {
            return res.status(422).json({
                message: 'Preencha os campos obrigatórios'
            })
        }
        try {
            await Interessado.update(
                { name, phone, category, course, email, source, obs },
                { where: { id } }
            )
            return res.json({ message: 'Interessado atualizado' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: 'Erro ao atualizar interessado'
            })
        }
    }
    static async totalByMonth(req, res) {
        try {
            const { initialDate, finalDate } = req.query
            const { result: interessados, total } = await totalByMonth(
                Interessado, initialDate, finalDate
            )
            return res.json({ interessados, total })
        } catch (error) {
            console.error(error)
            if (error.status == 422) {
                return res.status(422).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Erro ao buscar interessados' })
        }
    }
    static async totalBySource(req, res) {
        try {
            const { initialDate, finalDate } = req.query
            const { interessados, total } = await getTotalInteressadosBySource(
                initialDate, finalDate
            )
            return res.json({ interessados, total })
        } catch (error) {
            console.error(error)
            if (error.status == 422) {
                return res.status(422).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Erro ao buscar interessados' })
        }
    }
}

module.exports = InteressadoController