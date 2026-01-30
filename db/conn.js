require('mysql2')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    })
async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('conectado')
    } catch (error) {
        console.log(error)
    }
}
testConnection()

module.exports = sequelize

