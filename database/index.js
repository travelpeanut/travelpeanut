const pg = require('pg');
const config = require('../config.js')

const pool = new pg.Pool({
  host     : config.HOST,
  user     : config.USER,
  port     : config.PORT,
  password : config.PASSWORD,
  database : config.DATABASE
});

const selectAllTrips = ()  => {
  console.log('selecting all trips')
  const query = `SELECT * FROM TRIPS;`
  return pool.query(query)
    .catch(err => console.error(err))
};

exports.selectAllTrips = selectAllTrips; 

