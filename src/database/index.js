import { Sequelize } from 'sequelize'
import databaseconfig from '../config/database'

import Associacao from '../app/models/associacao'
import DadoBancario from '../app/models/DadoBancario'

const models = [Associacao, DadoBancario]

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