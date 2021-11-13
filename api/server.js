'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const api = require("./routes");
const app = express();

//Enabling CORS
 app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
      });

// Point static path to dist
app.use(express.static(path.join(__dirname, '../browser/dist')));

// Set our api routes
app.use('/', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/dist/index.html'));
});


//Get port from environment and store in Express. If not - 8080 is default port
var port = process.env.PORT || 8080;
app.set('port', port);

//Create HTTP server.
 
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
 
server.listen(port, 
  () => console.log(`API running on localhost:${port}!`));
