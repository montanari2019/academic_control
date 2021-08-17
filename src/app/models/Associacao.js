const  Model  = require('sequelize')
const  Sequelize = require('sequelize')

class Associacao extends Model {
    static init(sequelize) {
        super.init(
        {
            nome: Sequelize.STRING,
            cnpj: Sequelize.STRING,

        },
        {
            sequelize,
        }
    )
    return this
 }

}

module.exports = Associacao


