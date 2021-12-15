'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
    }, subtitle: {
      type: Sequelize.STRING,
    }, authors: {
      type: Sequelize.STRING,
    }, descr: {
      type: Sequelize.STRING(3000),

    }, categories: {
      type: Sequelize.STRING,
    }, pablisher: {
      type: Sequelize.STRING,
    }, publisherdate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }, previewlink: {
      type: Sequelize.STRING,
    }, coverimage: {
      type: Sequelize.STRING,
    }, searchword: {
      type: Sequelize.STRING,
    }, favorite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};