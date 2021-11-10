const format = require('pg-format');
require('dotenv').config();
const { Pool } = require('pg')
const conString = process.env.POSTGRES_URL //check later, doesn't work for pool
const connectionString = 'postgres://dviwjwhj:kz86i7OGuBGXCa6YAXPuivru98-k-CgC@fanny.db.elephantsql.com/dviwjwhj'
const pool = new Pool({connectionString})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })


//Connection to postgress db with static query
module.exports.single = asyncConnectSingle
  async function asyncConnectSingle(query, values = 0) {
    const client = await pool.connect()
    try {
      const res = await client.query(query, values)
      return res
      } finally {
      client.release()
    }
  }
  
//Connection to postgress db with dynamic multiple  query using pg-format
  module.exports.balk = asyncConnectBalk
    async function asyncConnectBalk(query, values = 0) {
      const client = await pool.connect()
      try {
       await client.query(format(query, values),[], (err, result)=>{
          console.log(err);
        })
      } finally {
        client.release()
      }
  }


