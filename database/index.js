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

const addTrip = () => {

}


exports.addNewUser = addNewUser; 



