
module.exports = function(app) {

const api = require('./apiconnection')
const db = require  ('./dbconnection')
const q = require('./queries');

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
    });


//Check if data allready in DB if not save it, if yes, send DB data to front end
app.get('/query/:param', async (req, res) => {
    db.conn(q.selectFromDB, [req.params.param])
    .then(data => {
    if(data.rows.length) {
      res.send(data.rows)
    } else {
      api.axiosCall(req, res)
      .then(response => {
        res.status(200);
        var dbData = response.map(item => Object.values(item)) //converts array of objects into array of arrays
        db.conn(q.insertMultiQuery, dbData, 1);
        res.send(response);
      })}
    })
  })
 
  //Get all books from DB
  app.get('/db/', async (req, result) => {
      var qres = await db.conn(q.selectAllQuery)
      result.send(qres.rows)
  })
  
  //Get all books which are favorite = true
  app.get('/shelf/', async (req, result) => {
      var qres = await db.conn(q.selectAllFromShelfQuery)
      result.send(qres.rows)
  })
  
  //Delete 1 in a table in DB
  app.get('/delete/', async (req, result) => {
    db.conn(q.deleteQuery)
  })

  //Delete all book from DB
  app.get('/deleteall/', async (req, result) => {
    db.conn(q.deleteAllQuery)
  })
  
  //Add a favorit book to DB (flag favorite) book to db
  app.get('/shelf/:param', async (req, result) => {
    var qarr = req.params.param.split(',')
     var request = [qarr[0], qarr[1]]
     var qres = await db.conn(q.updateFavoriteQuery, request)
     result.send(qres.rows)
  })
  
}