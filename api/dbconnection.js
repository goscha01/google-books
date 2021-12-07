const format = require('pg-format');
require('dotenv').config();
const { Pool } = require('pg')
const  POSTGRES_URL='postgres://dviwjwhj:kz86i7OGuBGXCa6YAXPuivru98-k-CgC@fanny.db.elephantsql.com/dviwjwhj'

// const databaseConfig = { connectionString: process.env.POSTGRES_URL };
const databaseConfig = { connectionString: POSTGRES_URL };
const pool = new Pool(databaseConfig);


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

//Connection to postgress db with dynamic multiple  query using pg-format
  module.exports.conn = asyncConnect
    async function asyncConnect(query, values = 0, flag = 0) {
     
      const client = await pool.connect()
      if (flag) {
         try {
         await client.query(format(query, values),[])
        } finally {
          client.release()
        }
         formQuery = format(query, values)

      } else {
        try {
          const res = await client.query(query, values)
          return res
          } finally {
          client.release()
        }
      }
   
  }


