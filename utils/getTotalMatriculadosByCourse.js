const { Op, fn, col, literal } = require("sequelize")
const Matriculado = require("../models/Matriculado")

// curso, sigla
const COURSES = [
    ['Eletromecânica Manhã', 'TRM'],
    ['Informática Manhã', 'TIM'],
    ['Eletromecânica Noite', 'TRN'],
    ['Eletrotécnica', 'TL'],
    ['Mecatrônica', 'TM'],
    ['Eletrônica', 'TE'],
    ['Informática Noite', 'TIN'],
    ['Eletromecânica Ead', 'ETR'],
    ['Automação Industrial Ead', 'ETA'],
    ['Eletrotécnica Ead', 'ETL'],
    ['Informática Ead', 'ETI'],
    ['Mecânica Ead', 'ETC'],
    ['Mecatrônica Ead', 'ETM'],
    ['Telecomunicações Ead', 'ETT'],
    ['Redes de Computadores Ead', 'ETD'],
    ['Eletrônica Ead', 'ETE'],
    ['Mecânica de Motocicletas', 'MMC'],
    ['Manutenção de Equipamentos Eletroeletrônicos', 'MEE'],
    ['Mecânica Automotiva e Injeção Eletrônica', 'MIE'],
    ['Mecânica de Refrigeração', 'PTR'],
    ['Eletricista de Redes de Baixa e Alta Tensão', 'ABT'],
    ['Instalação de Sistema de Energia Solar', 'SES'],
    ['Instalação de Rede de Fibra Óptica', 'FIB'],
    ['NR-35', 'N35'],
    ['Direção Defensiva', 'DIR'],
    ['NR-10 Reciclagem', 'N10R'],
    ['NR-10 Básico', 'N10B'],
    ['NR-10 SEP', 'N10S']
]

const getTotalMatriculadosByCourse = async (initialDate, finalDate) => {
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

    // 1) Busca apenas cursos que têm matrícula
    const totals = await Matriculado.findAll({
        attributes: [
            "course",
            [fn("COUNT", col("id")), "total"]
        ],
        where: {
            date: {
                [Op.between]: [initialDate, finalDate]
            }
        },
        group: ["course"]
    })

    // 2) Cria um mapa (curso => total)
    const totalsMap = {}
    totals.forEach(item => {
        totalsMap[item.course] = Number(item.get("total"))
    })

    // 3) Retorna todas as siglas (mesmo as zeradas)
    const matriculados = COURSES.map(([course, sigla]) => ({
        sigla, total: totalsMap[course] || 0
    }))

    // 4) Total geral
    const total = matriculados.reduce(
        (acc, item) => acc + item.total, 0
    )

    return { matriculados, total }
}


module.exports = getTotalMatriculadosByCourse