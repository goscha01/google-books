'use strict';

require('dotenv').config();
var format = require('pg-format');
const express = require('express');
const { Pool } = require('pg')
const axios = require('axios');
const app     = express();
const PORT    = 8000;
const apiKey = process.env.API_KEY
const bookUrl = process.env.BOOKS_URL
var currentdate = new Date()
var conString = process.env.POSTGRES_URL //check later, doesn't work for pool

var query2 = "INSERT INTO Books (title, subtitle, authors, descr, categories, pablisher, publisherDate, previewLink, coverImage) VALUES ('The Flower Book3', 'Let the Beauty of Each Bloom Speak for Itself', 'Rachel Siegfried', 'The Flower Book explores 60 flowers, bloom-by-bloom in stunning portraiture. Lush macrophotography allows readers to see the details of each featured flower up close, from the amaryllis in spring, snapdragon in summer, and dahlia in fall to tropical wonders such as orchids and more. Intimate portraits of each flower include quick-reference profiles with tips for choosing the best blooms, care for cut stems, arranging recommendations, colors, shapes, and even growing tips to transform the home, from yard to tabletop. Gorgeous photographs throughout spotlight 30 sample floral arrangements that show how to design and build custom floral arrangements using featured blooms. Plus, a step-by-step techniques section walks beginners through the basics of foliage and fillers, bouquets, and arrangements to make this book as practical as it is beautiful. The Flower Book celebrates all the wonderful qualities of flowers-their sheer beauty, infinite variety, and power to evoke admiration-bloom by exquisite bloom.', 'Nature', 'Penguin', '2017-02-07', 'http://books.google.com/books?id=WVLXDwAAQBAJ&printsec=frontcover&dq=flower&hl=&cd=1&source=gbs_api', 'http://books.google.com/books/content?id=WVLXDwAAQ…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api')"
var values = ['The Flower Book4', 'Let the Beauty of Each Bloom Speak for Itself', 'Rachel Siegfried', 'The Flower Book explores 60 flowers, bloom-by-bloom in stunning portraiture. Lush macrophotography allows readers to see the details of each featured flower up close, from the amaryllis in spring, snapdragon in summer, and dahlia in fall to tropical wonders such as orchids and more. Intimate portraits of each flower include quick-reference profiles with tips for choosing the best blooms, care for cut stems, arranging recommendations, colors, shapes, and even growing tips to transform the home, from yard to tabletop. Gorgeous photographs throughout spotlight 30 sample floral arrangements that show how to design and build custom floral arrangements using featured blooms. Plus, a step-by-step techniques section walks beginners through the basics of foliage and fillers, bouquets, and arrangements to make this book as practical as it is beautiful. The Flower Book celebrates all the wonderful qualities of flowers-their sheer beauty, infinite variety, and power to evoke admiration-bloom by exquisite bloom.', 'Nature', 'Penguin', '2017-02-07', 'http://books.google.com/books?id=WVLXDwAAQBAJ&printsec=frontcover&dq=flower&hl=&cd=1&source=gbs_api', 'http://books.google.com/books/content?id=WVLXDwAAQ…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api']
const selectAllQuery = 'select * FROM Books'
const insertQuery = 'INSERT INTO Books (title, subtitle, authors, descr, categories, pablisher, publisherDate, previewLink, coverImage, searchword) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
const insertMultiQuery = 'INSERT INTO Books (bookid, title, subtitle, authors, descr, categories, pablisher, publisherDate, previewLink, coverImage, searchword, tstamp ) VALUES %L'
const deleteQuery= 'DELETE FROM Books  WHERE id in ( SELECT id FROM Books ORDER BY id desc LIMIT 1 )'
const deleteAllQuery = 'TRUNCATE Books'
const serchWordQuery = 'SELECT COUNT(1) FROM Books WHERE searchword = $1'
const selectFromDB = 'SELECT * FROM Books WHERE searchword = $1'
const updateFavoriteQuery = 'UPDATE Books SET favorit = $1 WHERE bookid = $2 RETURNING favorit ;'

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

const connectionString = 'postgres://dviwjwhj:kz86i7OGuBGXCa6YAXPuivru98-k-CgC@fanny.db.elephantsql.com/dviwjwhj'
const pool = new Pool({
  connectionString,
})

pool.on('error', (err, client) => {
  // console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


  async function checkRequest(req){
    // console.log("checkRequest")
    var request = [req]
    var check = await asyncConnectSingle(selectFromDB, request)
    // console.log("checkRequest2")
    // console.log(check.rows[0].title)

    return check
  }

async function axiosCall(req, res) {
  // console.log('axiosCall')
  // console.log(req.params.param)
  axios.get(bookUrl, {
    params: {
    q: req.params.param,
    key: apiKey
  }})
    .then(response => {
        if (response) {
          // console.log('api then')
          // console.log(req.params.param)
          // console.log(response)
          // console.log(response.data.items)
          var api = response.data.items
          mapData(api, req.params.param)
          // mapDataQueryTable(api, 'one')
        res.status(200);
        res.send(response.data)
        // console.log(response.data)
      } else {
        res.status(404);
        res.json({ "message": `Oops! Cannot find ${req}` })
    }} )
}


//REST endpoint to FETCH query with param from the course array
app.get('/query/:param', async (req, res) => {
  // console.log('/query/:param')
  // console.log(req.params.param)
  checkRequest(req.params.param).then(data => {
      // console.log(data.rows[0].title)
      // console.log(data.rows.length)
  if(data.rows.length) {
    // var qres = await asyncConnectSingle(selectFromDB, req.params.param)
    // console.log("asyncConnectSingle")
    // console.log(check.rows)
    // console.log(data.length)
    res.send(data.rows)
  } else {
    // console.log('api')
    // console.log(req.params.param)
    if(req.params.param !== "undefined") {
      axiosCall(req, res) 
    }
   
  }
  }

  )

  
})


//get/put data from postgress db

async function asyncConnectSingle(query, values = 0) {
  console.log('asyncConnectSingle');
  var result
    console.log(query);
      console.log(values);
  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    console.log(query);
      console.log(values);
    
    result = res
   
  } finally {
    client.release()
  }
  // console.log(result.rows[0].title)
  console.log(result)
  return result
}
//get/put multiple data from postgress db

async function asyncConnectBalk(query, values = 0) {
  // console.log("asyncConnectBalk")
  // console.log(query);
  //     console.log(values);
  const client = await pool.connect()
  try {
    const res = await client.query(format(query, values),[], (err, result)=>{
      // console.log("await client.query");
      // console.log(query);
      // console.log(values);
      // console.log(result);
      console.log(err);
   
    })
    // console.log(query)
    // console.log(values)
    return res
  } finally {
    client.release()
  }
}

//get all books in db
  app.get('/db/', async (req, resalt) => {
    var qres = await asyncConnectSingle(selectAllQuery)
    // console.log(qres.rows)
    resalt.send(qres.rows)
})

//Delete 1 book from shelf
app.get('/delete/', async (req, resalt) => {
  
    asyncConnectSingle(deleteQuery)
  
})
//Delete all book from shelf
app.get('/deleteall/', async (req, resalt) => {
 
    asyncConnectSingle(deleteAllQuery)
  
})

//add book to db

app.get('/shelf/:param', async (req, resalt) => {
   console.log(req.params.param.split(','))
   var qarr = req.params.param.split(',')
   var request = [qarr[0], qarr[1]]
   var qres = await asyncConnectSingle(updateFavoriteQuery, request)
   resalt.send(qres.rows)
  
})

//get data from both
app.get('/both/', async (req, result) => {
  // console.log('both')
  var dbresponse = await asyncConnectSingle(selectAllQuery)
  axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers')
    .then(response => {
                // apiQueryResult = response.data
                var api = response.data.items
                var arr1 = mapData(api)
                // var arr2 = mapDataQueryTable(api, 'one')
                // console.log(api)
                // console.log(db)
                // var arr = [arr1, arr2]
                result.send(arr1)
    })
 
})

async function mapData(apiData, searchword) {
  var newApiData = apiData.map(data => [
    data.id, 
    data.volumeInfo.title?data.volumeInfo.title:null, 
    data.volumeInfo.subtitle?data.volumeInfo.subtitle:null,
    data.volumeInfo.authors?data.volumeInfo.authors[0]:null,
    data.volumeInfo.description?data.volumeInfo.description:null,
    data.volumeInfo.categories?data.volumeInfo.categories[0]:null,
    data.volumeInfo.publisher?data.volumeInfo.publisher:null,
    data.volumeInfo.publishedDate?data.volumeInfo.publishedDate:null,
    data.volumeInfo.previewLink?data.volumeInfo.previewLink:null,
    data.volumeInfo.imageLinks.smallThumbnail?data.volumeInfo.imageLinks.smallThumbnail:null,
    searchword,
    currentdate
   ])
  //  console.log(newApiData)
  // asyncConnectSingle(insertQuery, newApiData)
  await asyncConnectBalk(insertMultiQuery,newApiData)
  return newApiData
}

// function mapDataQueryTable(apiData, searchWord) {
//   var newApiData = apiData.map(data => [
//     data.id, 
//     searchWord,
//        ])
//   console.log(newApiData)
//   // asyncConnectSingle(insertQuery, newApiData)
//   asyncConnectBalk(searchInsertQuery,newApiData)
//   return newApiData
// }

app.listen(PORT);

console.log("Listening on port:", PORT);

