require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const conn = require('./db/conn')

require('./models/Interessado')
require('./models/Matriculado')

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.ORIGIN }))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.status(200).json({
    message: '✅ API está funcionando!',
    status: 'ok'
  })
})
const UserRoutes = require('./routes/UserRoutes')
const MatriculadoRoutes = require('./routes/MatriculadoRoutes')
const InteressadoRoutes = require('./routes/InteressadoRoutes')
app.use('/user', UserRoutes)
app.use('/matriculado', MatriculadoRoutes)
app.use('/interessado', InteressadoRoutes)
const PORT = process.env.PORT || 5000
conn.sync(/*{force: true}*/).then(() => {
  app.listen(PORT)
}).catch((error) => {
  console.log(error)
})
