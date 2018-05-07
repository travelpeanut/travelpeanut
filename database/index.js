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

const addMemberToTrip = (username, tripId) => {
  const query = `INSERT INTO USERS_TRIPS (USER_ID, TRIP_ID) VALUES ((SELECT ID FROM USERS WHERE USERNAME = '${username}'), ${tripId});`
  return pool.query(query)
  .catch((err) => {
    console.error(err)
  })
}

const getTripMembers = (tripId) => {
  const query = `(select * from users where Id in (select user_Id from users_trips where trip_Id = ${tripId}))`
  return pool.query(query)
  .catch((err => {
    console.error(err)
  }))
}

const getFirstNameByUsername = (username) => {
  const query = `select first_name from users where username = '${username}';`
  return pool.query(query)
  .catch((err) => {
    console.error(err)
  })
}

exports.addNewUser = addNewUser; 
exports.getTripsByUser = getTripsByUser; 
exports.checkLogin = checkLogin;
exports.addMemberToTrip = addMemberToTrip;
exports.getTripMembers = getTripMembers,
exports.getFirstNameByUsername = getFirstNameByUsername
