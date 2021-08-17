const { Sequelize } = require('sequelize')
const databaseconfig = require('../config/database')

const Associacao = require("../app/models/Associacao")
const Faculdade = require("../app/models/Faculdade")
const User = require("../app/models/User")
const Contrato = require("../app/models/Contrato")
const DadoBancario = require('../app/models/DadoBancario')


const models = [Associacao, Faculdade, User, Contrato, DadoBancario]

const connection = {
    constructor(){
        this.init()
    },

    init(){
        // Concetando as configurações do banco
        this.conection = new Sequelize(databaseconfig)

        // Passando as conexões com os Models
        models.map(model => model.init(this.conection)).map(model => model.associate && model.associate(this.conection.models))
    }
}

module.exports = connection
