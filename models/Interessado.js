const { DataTypes } = require('sequelize')
const sequelize = require('../db/conn')

const Interessado = sequelize.define('Interessado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    attendant: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    obs: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { tableName: 'interessados', timestamps: true })

module.exports = Interessado
