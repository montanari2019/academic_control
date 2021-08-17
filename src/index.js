require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const morgan = require('morgan')

const app = express()

// Importando o banco de dados
require('./database/index')

const port = 3233

app.use(express.json)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(process.env.PORT || port, () => { 
    console.log(`Servidor rodando na porta ${port}`)
})