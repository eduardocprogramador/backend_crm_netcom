const Interessado = require('../models/Interessado')
const getTodayDate = require('../utils/getTodayDate')
const capitalize = require('../utils/capitalize')
const getMatriculadosOrInteressados = require('../utils/getMatriculadosOrInteressados')
const totalByMonth = require('../utils/totalByMonth')
const { Op, fn, col, literal } = require("sequelize")

const getTotalInteressadosBySource = async (initialDate, finalDate) => {
    if (!initialDate || !finalDate) {
        const error = new Error("Preencha os campos de data")
        error.status = 422
        throw error
    }
    if (initialDate > finalDate) {
        const error = new Error("Data inicial maior que data final")
        error.status = 422
        throw error
    }
    const totalBySource = await Interessado.findAll({
        attributes: [
            [
                // transforma NULL em "Nenhum"
                literal("COALESCE(source, 'Nenhum')"),
                "source"
            ],
            [fn("COUNT", col("id")), "total"]
        ],
        where: {
            date: {
                [Op.between]: [initialDate, finalDate]
            }
        },
        group: [literal("COALESCE(source, 'Nenhum')")],
        order: [[literal("total"), "DESC"]],
        raw: true
    })
    const total = totalBySource.reduce(
        (acc, item) => acc + Number(item.total), 0
    )
    return { totalBySource, total }
}

class InteressadoController {
    static async add(req, res) {
        let { name, phone, category, course, source, email, attendant, obs } = req.body
        category = category.toString()
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