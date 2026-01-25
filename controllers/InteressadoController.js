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
            const { totalBySource, total } = await getTotalInteressadosBySource(
                initialDate, finalDate
            )
            return res.json({ totalBySource, total })
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