import Sequelize, { Model } from 'sequelize'

class Faculdade extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            cep: Sequelize.STRING,
            endereco: Sequelize.STRING,
            bairro: Sequelize.STRING,
            numero: Sequelize.STRING,
            cidade: Sequelize.STRING,
            estado: Sequelize.STRING,
            id_associacao: Sequelize.STRING,

        },
        {
            sequelize,
        },

    ) 
     
       return this
    }

    // Fazendo a associação do campo Associação ID
    static associate(models){
        this.belongsTo(models.Associacao, {foreignKey: 'id_associacao', as: 'associacao'})
    }
}

export default Faculdade
