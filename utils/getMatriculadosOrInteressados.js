const { Op } = require('sequelize')

// Model: Matriculado ou Interessado
const getMatriculadosOrInteressados = async (
    Model, initialDate, finalDate, name, category, course
) => {
    const where = {}
    // pega as pessoas pelo nome
    if (name) {
        where.name = { [Op.like]: `%${name}%` }
    }
    // pega as pessoas de cursos de determinada categoria
    if (category !== undefined && category !== null && category !== '' && !course) {
        where.category = Number(category)
    }
    // pega as pessoas de determinado curso
    if (course) {
        where.course = course
    }
    // pega as pessoas em um intervalo de data
    if (initialDate || finalDate) {
        if (initialDate && !finalDate) {
            where.date = { [Op.gte]: initialDate }
        }
        else if (!initialDate && finalDate) {
            where.date = { [Op.lte]: finalDate }
        } else {
            if (initialDate > finalDate) {
                const error = new Error('Data inicial maior que data final')
                error.status = 422
                throw error
            }
            where.date = { [Op.between]: [initialDate, finalDate] }
        }
    }
    const { rows: result, count: total } = await Model.findAndCountAll({
        where,
        order: [['date', 'DESC']]
    })
    return { result, total }
}

module.exports = getMatriculadosOrInteressados