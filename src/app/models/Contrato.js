import Sequelize, { Model } from 'sequelize'

class Contrato extends Model {
    static init(sequelize) {
        super.init({
            validade: Sequelize.DATE,
            aprovado: Sequelize.BOOLEAN,
            vigente: Sequelize.BOOLEAN,
            cancelado: Sequelize.BOOLEAN,
            descricao: Sequelize.STRING,
            dias_ultilizados: Sequelize.INTEGER,
            dias_viagem: Sequelize.STRING,
            admin_aprovocao: Sequelize.STRING,
            mensalidade: Sequelize.FLOAT,
            data_vencimento: Sequelize.INTEGER,
            id_user: Sequelize.INTEGER,
            id_associacao: Sequelize.INTEGER,
            id_faculdade: Sequelize.INTEGER,
            
        },

        {
            sequelize,
        },

    ) 
     
       return this
    }

    // Fazendo a associação do campo Associação ID
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'id_user', as: 'user'}),
        this.belongsTo(models.Associacao, {foreignKey: 'id_associacao', as: 'associacao'}),
        this.belongsTo(models.Faculdade, {foreignKey: 'id_faculdade', as: 'faculdade'})
    }
}

export default Contrato
