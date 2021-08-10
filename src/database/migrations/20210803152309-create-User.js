const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.createTable('User', { 
       
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      foto_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      RG: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CPF: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone01: {
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
     id_associacao:{
       type: sequelize.INTEGER,
       references: { model: 'Associacao', key: 'id' }
     },
     
    });
     
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable('User');
     
  }
};
