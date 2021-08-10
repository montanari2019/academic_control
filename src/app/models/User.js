import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init(
        {
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,

            admin: Sequelize.BOOLEAN,
            foto: Sequelize.STRING,
            RG: Sequelize.STRING,
            CPF: Sequelize.STRING,
            telefone01: Sequelize.STRING,
            cep: Sequelize.STRING,
            endereco: Sequelize.STRING,
            bairro: Sequelize.STRING,
            numero: Sequelize.STRING,
            cidade: Sequelize.STRING,
            estado: Sequelize.STRING,

        },
        {
            sequelize,
        },


    )

    // Criptografando a senha do usuário
    this.addHook('beforeSave', async user =>{
        if(user.password){
            user.password_hash = await bcrypt.hash(user.password, 10)
        }
    } )

    return this
    }
    // Fazendo a associação do campo Associação ID
    static associate(models){
        this.belongsTo(models.Associacao, {foreignKey: 'id_associacao', as: 'associacao'})
    }

}

export default User


