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
const addNewUser = (username, password, firstName, lastName, email) => {  
  const query = `INSERT INTO USERS (username, password, first_name, last_name, email)
                 VALUES ('${username}', '${password}', '${firstName}', '${lastName}', '${email}')`;
  console.log('query: ', query);  
  return pool.query(query)
    .catch( (err) => {
      console.log('ERROR IN ADDING USER: ', err);
    })
};

const checkLogin = (email) => {
  const query = `SELECT * FROM USERS WHERE EMAIL = '${email}'`
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
  const query1 = `DELETE FROM users_trips WHERE trip_id = ${tripId}`
  const query2 = `DELETE FROM trips WHERE trip_id = ${tripId}`
  return pool.query(query1)
    .then(() => {
      return pool.query(query2)
    })
    .catch((err) => {
      console.log('err in db')
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
  const query = `select * from users where username = '${username}';`
  return pool.query(query)
  .catch((err) => {
    console.error(err)
  })
}

const deleteTripMember = (memberId, tripId) => {
  const query = `DELETE FROM USERS_TRIPS WHERE USER_ID=${memberId} AND TRIP_ID=${tripId};`
  console.log('deleteTripMember query: ', query);
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    })
}

exports.addNewUser = addNewUser; 
exports.getTripsByUser = getTripsByUser; 
exports.checkLogin = checkLogin;
exports.deleteTrip = deleteTrip;
exports.addTripToTrips = addTripToTrips; 
exports.getNewTripId = getNewTripId; 
exports.addTripsByUser = addTripsByUser; 
exports.addMemberToTrip = addMemberToTrip;
exports.getTripMembers = getTripMembers,
exports.getFirstNameByUsername = getFirstNameByUsername;
exports.deleteTripMember = deleteTripMember;
