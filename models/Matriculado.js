const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Matriculado = sequelize.define('Matriculado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, { tableName: 'matriculados', timestamps: true })

module.exports = Matriculado
