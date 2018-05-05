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

const addTripToTrips = ({name, city, country, startDate, endDate, ownerId}) => {
  const query = `INSERT INTO TRIPS (city, country, start_date, end_date, title, owner_id)
                 VALUES ('${city}', '${country}', '${startDate}', '${endDate}', '${name}', '${ownerId}')`
  console.log('query: ', query);
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN ADDING TRIP: ', err);
    })
}

const addTripsByUser = (userid, tripid) => {
  const query = `INSERT INTO USERS_TRIPS (user_id, trip_id)
                 VALUES (${userid}, ${tripid})`
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN ADDING TRIP BY USER: ', err);
    })
}

const getNewlyCreatedTrip = (ownerId) => {
  const query = `SELECT * FROM TRIPS ORDER BY ID DESC LIMIT 1 WHERE OWNER_ID=${ownerId}`;
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN GETTING NEW TRIP ID: ', err);
    })
}

exports.addNewUser = addNewUser; 
exports.addTripToTrips = addTripToTrips; 



