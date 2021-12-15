const express = require('express');
const { truncate } = require('fs');
const router = express.Router();
const api = require('./apiconnection');
const { Book, sequelize } = require ('./models');
const { QueryTypes } = require('sequelize');
const q = require('./queries');

 
  router.get('/', (req, res) => {
    res.send('main path / router works!')
  })
  

    router.get('/query/:param', async (req, res) => {
      const query = req.params.param
      //check if there are  records with searchword in the DB
      try {
        const books = await Book.findAll({
          where: {
            searchword: query
          } 
        }) // if yes send it to fronend
        if(books.length > 0) {
          console.log('db')
          return res.json(books)
        } else { // if not make an api ca;ll
          console.log('api')
          api.axiosCall(req, res)
          .then(async response => {
                  res.status(200); //send data tp front end
  
            try {
              const books = await Book.bulkCreate(response) // populate data into db
              return res.json(books)
       
            } catch(err) {
              console.log(err)  
              return res.status(500).json({error:'Something wnet wrong'})
            } 
            
          })
        }
  
      } catch(err) {
        console.log(err)  
        return res.status(500).json({error:'Something wnet wrong'})
      }
        }
)

   
    //Get all books from DB
    router.get('/db', async (req, res) => {
      try {
        const books = await Book.findAll()

        return res.json(books)
      } catch(err) {
        console.log(err)  
        return res.status(500).json({error:'Something wnet wrong'})
      }
    })
    


    //Get all books which are favorite = true
    router.get('/shelf/', async (req, res) => {
        var qres = await sequelize.query(q.selectAllFromShelfQuery, { type: QueryTypes.SELECT})
         return res.json(qres)
    })
    
    //Delete 1 in a table in DB
    router.get('/delete/:bookid', async (req, res) => {
      const id = req.params.bookid
      try {
         await Book.destroy({
        where: {
          bookid: id
        }
      });
      return res.status(200).json({message: `Book ${id} Deleted!`})
      } catch(err) {
        return res.status(500).json({message: "Not succided"})
      }
     

    })
  
    //Delete all book from DB
    router.get('/deleteall/', async (req, res) => {
     await Book.destroy({
       truncate: truncate
     })
      return res.status(200).json({message: "all records deleted!"})
    })
    
    //Add a favorit book to DB (flag favorite) book to db
    router.get('/shelf/:id/:fav', async (req, res) => {
      console.log(req.params)

      var id = req.params.id
      var fav = req.params.fav

     var book = await Book.update({ favorite: fav }, 
        {
          where: {
            bookid: id
          }
        })
      
      return res.status(200).json(book)
    })
    


  module.exports = router;