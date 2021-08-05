const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.createTable('faculdade', { 
       
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
 
      },
     cep: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     endereco: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     bairro: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     numero: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     cidade: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     estado: {
       type: Sequelize.STRING,
       allowNull: false,
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
    
    await queryInterface.dropTable('faculdade');
     
  }
};
