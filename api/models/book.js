
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {

    static associate({ Author }) {
        this.hasMany(Author, { foreignKey: 'bookid'})
    }
        
    }

Book.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    bookid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
  }, subtitle: {
    type: DataTypes.STRING,
  }, authors: {
    type: DataTypes.STRING,
  }, descr: {
    type: DataTypes.STRING(3000),

  }, categories: {
    type: DataTypes.STRING,
  }, pablisher: {
    type: DataTypes.STRING,
  }, publisherdate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }, previewlink: {
    type: DataTypes.STRING,
  }, coverimage: {
    type: DataTypes.STRING,
  }, searchword: {
    type: DataTypes.STRING,
  }, favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  tableName: 'books',
  modelName: 'Book'
});

return Book;
}

