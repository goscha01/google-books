'use strict';

const express = require('express');
const app = express();
const api = require("./routes");
const { sequelize, Book } = require ('./models');

app.use(express.json())

//Enabling CORS
 app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
      });



// Set our api routes
app.use('/api', api);


//Get port from environment and store in Express. If not - 8080 is default port
var port = process.env.PORT || 3000;
app.set('port', port);

//Listen on provided port, on all network interfaces.
 
app.listen(port, 
  async () => {

    console.log(`API now running on localhost:${port}!`);
    await sequelize.authenticate()
    // await Book.sync({ force: true });
    console.log('Database connected!')
  });


