const  Model  = require('sequelize')
const  Sequelize = require('sequelize')

class DadoBancario extends Model {
    static init(sequelize) {
        super.init({
            banco: Sequelize.STRING,
            agencia: Sequelize.STRING,
            conta: Sequelize.STRING,
            cod_cedente: Sequelize.STRING,
            cod_convenio: Sequelize.STRING,
        },
        {
            sequelize,
        })     
        return this
    }

    static associate(models){
        this.belongsTo(models.Associacao, {foreignKey: 'id_associacao', as: 'associacao'})
    }
}

module.exports = DadoBancario
