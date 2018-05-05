const pg = require('pg');
const config = require('../config.js')

const pool = new pg.Pool({
  host     : config.HOST,
  user     : config.USER,
  port     : config.PORT,
  password : config.PASSWORD,
  database : config.DATABASE
});


// ============
// Helper Functions
// ============
const addNewUser = ({username, password, firstName, lastName}) => {  
  const query = `INSERT INTO USERS (username, password, first_name, last_name)
                 VALUES ('${username}', '${password}', '${firstName}', '${lastName}')`;
  console.log('query: ', query);  
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN ADDING USER: ', err);
    })
};

const checkLogin = (username) => {
  const query = `SELECT * FROM USERS WHERE USERNAME = '${username}'`
  return pool.query(query)
  .catch((error) => console.error(error));
}


const getTripsByUser = (userId) => {
  const query = `select * from trips 
                  inner join users_trips on users_trips.trip_id = trips.id
                  where user_id = ${userId};`
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN GETTING TRIPS FOR USERID: ', err);
    })
}

exports.addNewUser = addNewUser; 
exports.getTripsByUser = getTripsByUser; 
exports.checkLogin = checkLogin;


