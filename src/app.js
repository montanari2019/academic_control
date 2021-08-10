require('dotenv').config()

import express, { urlencoded } from 'express'
import multer from 'multer'
import routes from './routes'
import path from 'path'


// Importando o banco de dados
import './database/index'


class App {

    constructor(){
        this.server = express()
        this.middleware()
        this.router()
    }

    middleware(){
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    }

    router(){
        this.server.use(routes)
    }


}
export default new App().server