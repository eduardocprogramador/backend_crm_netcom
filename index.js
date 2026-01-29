const fs = require('fs')
let envFile = '.env'
if (process.env.NODE_ENV == 'production') {
  envFile = '.env.production'
} else if (fs.existsSync('.env.development')) {
  envFile = '.env.development'
}
require('dotenv').config({ path: envFile })

const express = require('express')
const cors = require('cors')
const app = express()
const conn = require('./db/conn')

require('./models/User')
require('./models/Interessado')
require('./models/Matriculado')

const UserRoutes = require('./routes/UserRoutes')
const MatriculadoRoutes = require('./routes/MatriculadoRoutes')
const InteressadoRoutes = require('./routes/InteressadoRoutes')

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.ORIGIN }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: '✅ API está funcionando!',
    status: 'ok'
  })
})

app.get("/health", (req, res) => {
  try {
    require("mysql2")
    return res.json({ ok: true, mysql2: "loaded" })
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) })
  }
})

app.use('/user', UserRoutes)
app.use('/matriculado', MatriculadoRoutes)
app.use('/interessado', InteressadoRoutes)

const PORT = process.env.PORT || 5000
conn.sync(/*{force: true}*/).then(() => {
  app.listen(PORT)
}).catch((error) => {
  console.log(error)
})
