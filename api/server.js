'use strict';


const express = require('express');
const axios = require('axios');
const app     = express();
const PORT    = 8000;
const { Client, Pool } = require('pg');

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

var reqResult;
var fullResilt;
var queryData;

// implement your gbooks functionality and route(s) here!
axios.get('https://www.googleapis.com/books/v1/volumes/s1gVAAAAYAAJ')
  .then(response => {
    reqResult = response.data.volumeInfo.title;
    fullResilt= response.data;
    // console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

  axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers')
  .then(response => {
    console.log(response.data);
    queryData= response.data;
  })
  .catch(error => {
    console.log(error);
  });
  


//REST endpoint to FETCH default boobk name from the gbooks API
app.get('/name', (req, res) => {
  let data = reqResult
  if (data) {
      res.status(200);
      res.json({ 'message': `THe book title is ${data}` });
  } else {
      res.status(404);
      res.json({ "message": `Oops! Cannot find ${req}` })
  }
})


//REST endpoint to FETCH all data of the default gbook
app.get('/data', (req, res) => {
  let data = fullResilt
  if (data) {
      res.status(200);
      res.json({data})
  } else {
      res.status(404);
      res.json({ "message": `Oops! Cannot find ${req}` })
  }
})


//REST endpoint to FETCH flower query from the gbooks API
app.get('/query', (req, res) => {
  let data = queryData
  if (data) {
      res.status(200);
      res.json({data})
  } else {
      res.status(404);
      res.json({ "message": `Oops! Cannot find ${req}` })
  }
})
//REST endpoint to FETCH particular course from the course array
// app.get('/courses/:course', (req, res) => {
//   let data = topCourses.find(course => course.courseName.toLowerCase() == req.params.course.toLowerCase())
//   if (data) {
//       res.status(200);
//       res.json({ 'message': `Rating of ${data.courseName} is ${data.rating}` })
//   } else {
//       res.status(404);
//       res.json({ "message": `Oops! Cannot find ${req.params.course}` })
//   }
// })


app.listen(PORT);

console.log("Listening on port:", PORT);