import Sequelize, { Model } from 'sequelize'

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
 }

}

export default Associacao


