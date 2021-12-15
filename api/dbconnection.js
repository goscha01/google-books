const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const Book = require('./models/book')


require('dotenv').config();
// const { Pool } = require('pg')
const  POSTGRES_URL='postgres://dviwjwhj:kz86i7OGuBGXCa6YAXPuivru98-k-CgC@fanny.db.elephantsql.com/dviwjwhj'
const POSTGRES_URL_AWS='postgres://postgres:admin12345@google-books-db.ciyq4ufpar8z.us-east-1.rds.amazonaws.com/postgres'

// const sequelize = new Sequelize(POSTGRES_URL)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  await Book.sync({ force: true });
console.log("The table for the User model was just (re)created!");
}



module.exports.dbConnect = dbConnect;

 


