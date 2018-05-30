const pg = require('pg');
const config = require('../config.js');

const pool = new pg.Pool({
  host: config.HOST,
  user: config.USER,
  port: config.PORT,
  password: config.PASSWORD,
  database: config.DATABASE,
});

// ============
// Helper Functions
// ============
const addNewUser = (firstName, lastName, email, uid) => {
  const query1 = `INSERT INTO USERS (first_name, last_name, email, uid)
                 VALUES ('${firstName}', '${lastName}', '${email}', '${uid}')`;
  const query2 = `SELECT * FROM USERS WHERE EMAIL = '${email}'`;
  return pool.query(query1)
    .then(() => pool.query(query2))
    .catch((err) => {
      console.error('err in db: ', err);
    });
};


const checkLogin = (email) => {
  const query = `SELECT * FROM USERS WHERE EMAIL = '${email}'`;
  return pool.query(query)
    .catch(error => console.error(error));
};


const getTripsByUser = (userId) => {
  const query = `select * from trips 
                  inner join users_trips on users_trips.trip_id = trips.id
                  where user_id = ${userId};`;
  return pool.query(query)
    .catch((err) => {
      console.error('ERROR IN GETTING TRIPS FOR USERID: ', err);
    });
};

const addTripToTrips = ({ name, city, country, startDate, endDate, ownerId }) => {
  const query = `INSERT INTO TRIPS (city, country, start_date, end_date, title, owner_id)
                 VALUES ('${city}', '${country}', '${startDate}', '${endDate}', '${name}', '${ownerId}')`;
  // console.error('query: ', query);
  return pool.query(query)
    .catch((err) => {
      console.error('ERROR IN ADDING TRIP: ', err);
    });
};

const addTripsByUser = (userid, tripid) => {
  const query = `INSERT INTO USERS_TRIPS (user_id, trip_id)
                 VALUES (${userid}, ${tripid})`;
  return pool.query(query)
    .catch((err) => {
      console.error('ERROR IN ADDING TRIP BY USER: ', err);
    });
};

const getNewTripId = (ownerId) => {
  const query = `SELECT * FROM TRIPS WHERE OWNER_ID=${ownerId} ORDER BY ID DESC LIMIT 1`;
  return pool.query(query)
    .catch((err) => {
      console.error('ERROR IN GETTING NEW TRIP ID: ', err);
    });
};

const deleteTrip = (tripId) => {
  const query1 = `DELETE FROM users_trips WHERE trip_id = ${tripId}`;
  const query2 = `DELETE FROM trips WHERE id = ${tripId}`;
  return pool.query(query1)
    .then(() => pool.query(query2))
    .catch((err) => {
      console.error('err in db: ', err);
    });
};

const addMember = (userId, tripId) => {
  const query = `INSERT INTO USERS_TRIPS (USER_ID, TRIP_ID) VALUES (${userId}, ${tripId});`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const getTripMembers = (tripId) => {
  const query = `(select * from users where Id in (select user_Id from users_trips where trip_Id = ${tripId}))`;
  return pool.query(query)
    .catch(((err) => {
      console.error(err);
    }));
};

const getFirstNameByUsername = (username) => {
  const query = `select * from users where username = '${username}';`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const deleteTripMember = (memberId, tripId) => {
  const query = `DELETE FROM USERS_TRIPS WHERE USER_ID=${memberId} AND TRIP_ID=${tripId};`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const saveInvite = (email, tripId, ownerId) => {
  const query = `INSERT INTO INVITATIONS (USER_EMAIL, TRIP_ID, OWNER_ID) VALUES ('${email}', ${tripId}, ${ownerId});`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const getPendingInvites = (tripId) => {
  const query = `SELECT USER_EMAIL FROM INVITATIONS WHERE TRIP_ID = ${tripId};`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const deleteInvite = (email, tripId) => {
  const query = `DELETE FROM INVITATIONS WHERE USER_EMAIL = '${email}' AND TRIP_ID = ${tripId};`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const getInvitations = (email) => {
  const query = `SELECT TRIPS.ID, TRIPS.TITLE, USERS.FIRST_NAME FROM INVITATIONS 
  INNER JOIN TRIPS 
  ON INVITATIONS.TRIP_ID = TRIPS.ID
  INNER JOIN USERS
  ON INVITATIONS.OWNER_ID = USERS.ID
  WHERE USER_EMAIL = '${email}';`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const deleteInvitation = (email, tripId) => {
  const query = `DELETE FROM INVITATIONS WHERE USER_EMAIL = '${email}' AND TRIP_ID = ${tripId};`;
  return pool.query(query)
    .catch((err) => {
      console.error(err);
    });
};

const addActivity = (tripId, activityDate, startTime, activityName) => {
  const query = `INSERT INTO activities (trip_id, description, date_of_activity, start_time) values (${tripId}, '${escape(activityName)}', '${activityDate}', '${startTime}');`;
  return pool.query(query)
    .catch((err) => {
      console.error('couldnt insert activity:', err);
    });
};

const getActivites = (tripId, activityDate) => {    
  const query = `SELECT * FROM activities WHERE date_of_activity='${activityDate}' AND trip_id=${tripId} order by start_time asc`;  
  return pool.query(query)
    .catch((err) => {
      console.error('couldnt get activities:', err);      
    });
};

const getAllActivities = (tripId) => {
  const query = `SELECT * FROM activities WHERE trip_id=${tripId} order by start_time asc`;
  return pool.query(query)
    .catch((err) => {
      console.error('couldnt get activities:', err);      
    });
};

const updateActivity = (activityId, activityName, startTime) => {
  const query = `UPDATE activities SET description = '${activityName}', start_time='${startTime}' WHERE id = ${activityId};`
  return pool.query(query)
    .catch(err => {
      console.error('couldnt update table:', err)
    });
}

const deleteActivity = (activityId) => {
  const query = `DELETE FROM activities WHERE id = ${activityId};`
  return pool.query(query)
    .catch(err => {
      console.error('issue with db query:', err)
    });
}

const voteActivity = (activityId, userId, tripId, vote) => {
  const query = `INSERT INTO activities_votes (user_id, activity_id, trip_id, vote) values (${userId}, ${activityId}, ${tripId}, ${vote});`   
  return pool.query(query)
   .catch(err => {    
     const updatequery = `UPDATE activities_votes SET vote = ${vote} WHERE user_id=${userId} AND activity_id=${activityId};`
     return pool.query(updatequery)
     .catch(err => {
     console.error('couldnt update vote:', err)
   })
   })
}


const getVotesForActivity = ( activityId ) => {
  const query = `SELECT activity_id, vote, count(*) FROM activities_votes WHERE activity_id = ${activityId} group by activity_id, vote;`
  return pool.query(query)
  .catch(err => {
    console.error('issue with db query:', err)
  })
}

exports.addNewUser = addNewUser;
exports.getTripsByUser = getTripsByUser;
exports.checkLogin = checkLogin;
exports.deleteTrip = deleteTrip;
exports.addTripToTrips = addTripToTrips;
exports.getNewTripId = getNewTripId;
exports.addTripsByUser = addTripsByUser;
exports.addMember = addMember;
exports.getTripMembers = getTripMembers;
exports.getFirstNameByUsername = getFirstNameByUsername;
exports.deleteTripMember = deleteTripMember;
exports.saveInvite = saveInvite;
exports.getPendingInvites = getPendingInvites;
exports.deleteInvite = deleteInvite;
exports.getInvitations = getInvitations;
exports.deleteInvitation = deleteInvitation;
exports.addActivity = addActivity;
exports.getActivites = getActivites;
exports.updateActivity = updateActivity;
exports.deleteActivity = deleteActivity;
exports.voteActivity = voteActivity;
exports.getVotesForActivity = getVotesForActivity;
exports.getAllActivities = getAllActivities;
