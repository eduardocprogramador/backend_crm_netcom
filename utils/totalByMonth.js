const { Op, fn, col } = require("sequelize")

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function listMonthsBetween(start, end) {
    const s = new Date(start + "T00:00:00")
    const e = new Date(end + "T00:00:00")

    // para listar meses, normaliza para o 1º dia do mês
    s.setDate(1)
    e.setDate(1)

    const months = []
    const cursor = new Date(s)

    while (cursor <= e) {
        const y = cursor.getFullYear()
        const m = cursor.getMonth() + 1 // 1-12
        const ym = `${y}-${String(m).padStart(2, "0")}` // YYYY-MM
        const label = `${MONTHS[m - 1]}/${y}`        // Jan/2025
        months.push({ ym, month: label })
        cursor.setMonth(cursor.getMonth() + 1)
    }
    return months
}

const totalByMonth = async (Model, initialDate, finalDate) => {
    if (!initialDate || !finalDate) {
        const error = new Error("Preencha os campos de data")
        error.status = 422
        throw error
    }
    if (initialDate > finalDate) {
        const error = new Error('Data inicial maior que data final')
        error.status = 422
        throw error
    }
    
    // 1) Conta por mês somente dentro do intervalo
    const rows = await Model.findAll({
        attributes: [
            [fn("DATE_FORMAT", col("date"), "%Y-%m"), "ym"],
            [fn("COUNT", col("id")), "total"],
        ],
        where: {
            date: { [Op.between]: [initialDate, finalDate] },
        },
        group: ["ym"],
        order: [[fn("DATE_FORMAT", col("date"), "%Y-%m"), "ASC"]],
        raw: true,
    })

    // 2) Mapa ym -> total
    const totalsMap = new Map(rows.map((r) => [r.ym, Number(r.total)]))

    // 3) Gera todos os meses do intervalo e preenche 0 quando não existir
    const months = listMonthsBetween(initialDate, finalDate)
    const result = months.map((m) => ({
        month: m.month,                 // Jan/2025
        total: totalsMap.get(m.ym) ?? 0 // inclui meses com 0
    }))

    // 4) Total geral
    const total = result.reduce((acc, item) => acc + item.total, 0)

    return { result, total, range: { start: initialDate, end: finalDate } }
}

module.exports = totalByMonth
