import { Sequelize } from 'sequelize'
import databaseconfig from '../config/database'

import Associacao from '../app/models/associacao'

const models = [Associacao]

class Database {
    constructor(){
        this.init()
    }

    init(){
        this.conection = new Sequelize(databaseconfig)

        models.map(model => model.init(this.conection))
    }
}

export default new Database()