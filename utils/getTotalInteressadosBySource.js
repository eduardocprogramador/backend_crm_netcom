const { Op, fn, col, literal } = require("sequelize")
const Interessado = require("../models/Interessado")

const SOURCES = [
    "Google",
    "Instagram",
    "Facebook",
    "Site",
    "Ex-aluno",
    "Indicação",
    "Panfleto",
    "WhatsApp",
    "Nenhum"
]

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

    // 1) Busca só o que existe no banco
    const rows = await Interessado.findAll({
        attributes: [
            [
                literal("COALESCE(NULLIF(source, ''), 'Nenhum')"),
                "source"
            ],
            [fn("COUNT", col("id")), "total"]
        ],
        where: {
            date: { [Op.between]: [initialDate, finalDate] }
        },
        group: [
            literal("COALESCE(NULLIF(source, ''), 'Nenhum')")
        ],
        raw: true
    })

    // 2) Mapa source -> total
    const totalsMap = new Map(
        rows.map(r => [r.source, Number(r.total)])
    )

    // 3) Gera todos os canais, preenchendo 0 quando não existir
    const interessados = SOURCES.map(source => ({
        source, total: totalsMap.get(source) ?? 0
    }))

    // 4) Total geral
    const total = interessados.reduce(
        (acc, item) => acc + item.total, 0
    )

    return { interessados, total }
}

module.exports = getTotalInteressadosBySource
