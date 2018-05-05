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
  console.log('addTripsByUser userid: ', userid)
  console.log('addTripsByUser tripid: ', tripid)

  const query = `INSERT INTO USERS_TRIPS (user_id, trip_id)
                 VALUES (${userid}, ${tripid})`
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN ADDING TRIP BY USER: ', err);
    })
}

const getNewTripId = (ownerId) => {
  const query = `SELECT * FROM TRIPS WHERE OWNER_ID=${ownerId} ORDER BY ID DESC LIMIT 1`;
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN GETTING NEW TRIP ID: ', err);
    })
}

const deleteTrip = (tripId) => {
  const query1 = ``
}

exports.addNewUser = addNewUser; 
exports.getTripsByUser = getTripsByUser; 
exports.checkLogin = checkLogin;
exports.deleteTrip = deleteTrip;
exports.addTripToTrips = addTripToTrips; 
exports.getNewTripId = getNewTripId; 
exports.addTripsByUser = addTripsByUser; 



