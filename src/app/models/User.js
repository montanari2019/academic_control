import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
const aws = require('aws-sdk')

const s3 = new aws.S3()

class User extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
            foto: Sequelize.STRING,
            foto_url: Sequelize.STRING,
            r_g: Sequelize.STRING,
            c_p_f: Sequelize.STRING,
            telefone: Sequelize.STRING,
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

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }

    s3Delete(key){       
        return s3.deleteObject({Bucket: 'controledeacademicos',Key: key
        }).promise()
    }

}

export default User



