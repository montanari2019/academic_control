const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('dadosBancarios', { 
     id: {
       type: sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
     },

     banco:{
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     agencia:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    conta:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cod_cedente:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cod_convenio:{
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_associacao:{
      type: sequelize.INTEGER,
      references: { model: 'associacao', key: 'id' }
    },   
    created_at:{
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at:{
      type: Sequelize.DATE,
      allowNull: false
    },
    
    });
     
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('dadosBancarios');
     
  }
};
