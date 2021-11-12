const express = require('express');
const router = express.Router();


  const api = require('./apiconnection')
  const db = require  ('./dbconnection')
  const q = require('./queries');
  
  // app.use(function (req, res, next) {
  //     //Enabling CORS
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  //     next();
  //     });
  
  router.get('/', (req, res) => {
    res.send('main path / works on ELB!')
  })
  

  
  //Check if data allready in DB if not save it, if yes, send DB data to front end
  router.get('/query/:param', async (req, res) => {
      db.conn(q.selectFromDB, [req.params.param])
      .then(data => {
      if(data.rows.length) {
        console.log(data.rows)
        res.send(data.rows)
      } else {
        api.axiosCall(req, res)
        .then(response => {
          res.status(200);
          console.log(response)
          var dbData = response.map(item => Object.values(item)) //converts array of objects into array of arrays
          db.conn(q.insertMultiQuery, dbData, 1);
          res.send(response);
        })}
      })
    })
   
    //Get all books from DB
    router.get('/db/', async (req, result) => {
        var qres = await db.conn(q.selectAllQuery)
        console.log(qres.rows)
        result.send(qres.rows)
    })
    
    //Get all books which are favorite = true
    router.get('/shelf/', async (req, result) => {
        var qres = await db.conn(q.selectAllFromShelfQuery)
        console.log(qres.rows)
        result.send(qres.rows)
    })
    
    //Delete 1 in a table in DB
    router.get('/delete/', async (req, result) => {
      var qres = await db.conn(q.deleteQuery)
      console.log(qres.rows)
      result.send(qres.rows)
    })
  
    //Delete all book from DB
    router.get('/deleteall/', async (req, result) => {
      var qres = await db.conn(q.deleteAllQuery)
      console.log(qres.rows)
      result.send(qres.rows)
    })
    
    //Add a favorit book to DB (flag favorite) book to db
    router.get('/shelf/:param', async (req, result) => {
      var qarr = req.params.param.split(',')
       var request = [qarr[0], qarr[1]]
       var qres = await db.conn(q.updateFavoriteQuery, request)
       result.send(qres.rows)
    })
    


  module.exports = router;