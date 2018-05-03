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
  const query = `SELECT * FROM TRIPS;`
  return pool.query(query)
  .catch(err => console.error(err))
};

module.exports = pool;
