import { Sequelize } from 'sequelize'
import databaseconfig from '../config/database'

import Associacao from '../app/models/associacao'
import DadoBancario from '../app/models/DadoBancario'
import User from '../app/models/User'
import Faculdade from '../app/models/Faculdade'
import Contrato from '../app/models/Contrato'

const models = [Associacao, DadoBancario, User, Faculdade, Contrato]

class Database {
    constructor(){
        this.init()
    }

    init(){
        // Concetando as configurações do banco
        this.conection = new Sequelize(databaseconfig)

        // Passando as conexões com os Models
        models.map(model => model.init(this.conection)).map(model => model.associate && model.associate(this.conection.models))
    }
}

export default new Database()