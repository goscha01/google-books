'use strict';

// require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app     = express();
const PORT    = 8000;
const { Client, Pool } = require('pg');

const apiKeyTest = process.env.API_KEY

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});



// implement your gbooks functionality and route(s) here!
  // axios.get("https://www.googleapis.com/books/v1/volumes?", {
  //   params: {
  //   q: queryParam
  // }})
  // .then(response => {
  //   // console.log(response.data);
  //   queryData= response.data;
  // })
  // .catch(error => {
  //   console.log(error);
  // });


  // const apiCall = (par) => {
  //   axios.get("https://www.googleapis.com/books/v1/volumes?", {
  //   params: {
  //   q: par
  // }})
  // .then(response => {
  //   // console.log(response.data);
  //   return response.data;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  // }
  

//REST endpoint to FETCH query with param from the course array
app.get('/query/:param', async (req, res) => {
  console.log(req.params.param)
  axios.get("https://www.googleapis.com/books/v1/volumes?", {
    params: {
    q: req.params.param
  }})
    .then(response => {
            if (response) {
        res.status(200);
        res.send(response.data)
        console.log(response.data)
        console.log(apiKeyTest)
    } else {
        res.status(404);
        res.json({ "message": `Oops! Cannot find ${req}` })
    }} )
})


const apiKey = 'AIzaSyC3WtNnKDXtglXeJLTPWVVzpPLGTyd59O4'
//REST endpoint to FETCH user shelf
app.get('/shelf/:param', async (req, res) => {
  console.log(req.params.param)
  axios.get(`https://www.googleapis.com/books/v1/users/106147279438994271509/bookshelves/1001/volumes?key=${apiKey}`)
    .then(response => {
            if (response) {
        res.status(200);
        res.send(response.data.items)
        console.log(response.data.items)
    } else {
        res.status(404);
        res.json({ "message": `Oops! Cannot find ${req}` })
    }} )
})

// https://www.googleapis.com/books/v1/users/1112223334445556677/bookshelves

app.listen(PORT);

console.log("Listening on port:", PORT);