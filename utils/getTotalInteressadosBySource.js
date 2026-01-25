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

module.exports = getTotalInteressadosBySource