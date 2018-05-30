import ActionTypes from '../constants/ActionTypes';
import { push } from 'react-router-redux';
import axios from 'axios';
import moment from 'moment'

const getAllTrips = () => (dispatch, getState) => {
  const userId = getState().userReducer.currentUser.id;
  axios.get('/api/trips', {
    params: {
      userId,
    },
  })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.GET_ALL_TRIPS,
        code: data.rows,
      });
      return data.rows
    })
    .then((trips) => {      
      let cities = []
      trips.forEach((e) => cities.push(e.city))
      return axios.get('/api/photos', {
        params: {cities}
      })
    })
    .then((res) => {      
      dispatch({
        type: ActionTypes.SET_PHOTOS,
        code: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};


const createTrip = data => (dispatch, getState) => {  
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data,
  });
  axios.post('/api/newTrip', data)
    .then(() => axios.get('/api/tripId', { params: { id: data.ownerId } }))
    .then((response) => {      
      const newTripId = response.data.id;
      return axios.post('/api/usersByTrips', {
        newTripId,
        ownerId: data.ownerId,
      });
    })
    .then(() => {
      dispatch(getAllTrips(data.ownerId));
    })
    .catch((err) => {
      console.error(err);
    });
  dispatch(push('/home'));
};

const setCurrentTrip = item => (dispatch, getState) => {  
  dispatch({
    type: ActionTypes.SET_CURRENT_TRIP,
    code: item,
  });
  dispatch(push(`/trip/${item.trip_id}`));
};

const deleteTrip = (tripId, userId) => (dispatch, getState) => {
  axios.delete('/api/trips', { data: { tripId } })
    .then(() => {
      dispatch(getAllTrips(userId));
    })
    .catch((err) => {
      console.error(err);
    });
};
const addMember = tripId => (dispatch, getState) => {
  const userId = getState().userReducer.currentUser.id;    
  axios.post('/api/trip/members', {
    params: {
      userId,
      tripId,
    },
  })
    .then(({ data }) => {      
      dispatch({
        type: ActionTypes.ADD_MEMBER,
        member: data,
      });
    });
};

const getTripMembers = () => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id;
  axios.get('/api/trip/members', {
    params: {
      tripId,
    },
  })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.GET_TRIP_MEMBERS,
        members: data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteTripMember = memberId => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id;
  axios.delete('/api/trip/members', {
    data: {
      memberId,
      tripId,
    },
  })
    .then(() => {
      dispatch(getTripMembers());
    })
    .catch((err) => {
      console.error(err);
    });
};

const getPendingInvites = () => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id;
  axios.get('/api/trip/invite', {
    params: {
      tripId
    },
  })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.GET_PENDING_INVITES,
        pendingInvites: data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendInvite = toEmail => (dispatch, getState) => {
  const { trip_id, city, owner_id } = getState().tripReducer.currentTrip;
  const { email, firstName } = getState().userReducer.currentUser;
  axios.post('/api/trip/invite', {
    params: {
      toEmail,
      trip_id,
      owner_id,
      email,
      firstName,
      city,
    },
  })
    .then(() => {
      dispatch(getPendingInvites());
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteInvite = email => (dispatch, getState) => {
  const { owner_id } = getState().tripReducer.currentTrip;
  const tripId = getState().tripReducer.currentTrip.trip_id;
  axios.delete('/api/trip/invite', {
    params: {
      email,
      tripId,
    },
  })
    .then(() => {
      dispatch(getPendingInvites());
    })
    .catch((error) => {
      console.error(error);
    });
};

const getActivitiesForDate = (activityDate) => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id  
  axios.get('/api/activities', { params: { activityDate, tripId, } })
    .then(({data}) => {
      dispatch({
        type: ActionTypes.GET_ACTIVITIES,
        activities: data.rows,
      });      
    })
    .catch((err) => {
      console.error('couldnt get activities from db', err);
    });
  };

const addCustomActivity = (activityName, startTime, activityDate) => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id
  axios.post('/api/activities', {
    params: {
      tripId,
      activityDate,
      startTime,
      activityName
    }
  })
  .then(() => {      
    dispatch(getActivitiesForDate(activityDate));     
  })
  .catch((err) => {
    console.error('couldnt save activity:', err);
  });
}

// const pushToTripDetailPage = (tripDay) => (dispatch, getState) => {
//   const tripId = getState().tripReducer.currentTrip.trip_id


// }


const addActivityToItinerary = (activityName, startTime, activityDate) => (dispatch, getState) => {  
  const tripId = getState().tripReducer.currentTrip.trip_id
  const startdate = moment(getState().tripReducer.currentTrip.start_date, 'YYYY-MM-DD').format('YYYY-MM-DD')
  const day = moment(activityDate).diff(moment(startdate), 'days') + 1
            

  axios.post('/api/activities', { 
    params: {
      tripId,
      activityDate,
      startTime,
      activityName
    } 
})
  .then(() => {      
    dispatch(getActivitiesForDate(activityDate));     
  })
  .then(() => {
    dispatch(push(`/trip/${tripId}/details/${day}`));
  })
  .catch((err) => {
      console.error('couldnt save activity:', err);
    });
};

const updateActivity = (activityId, activityName, dateOfActivity, startTime) => (dispatch, getState) => {  
  const tripId = getState().tripReducer.currentTrip.trip_id
  axios.patch('/api/activities', {params: {activityId, activityName, startTime}})
  .then(() => {
    dispatch(getActivitiesForDate(dateOfActivity, tripId))    
  })
  .catch(err => {
    console.error('couldnt update activity:', err)
  })
}

const deleteActivity = (activityId, dateOfActivity) => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id
  axios.delete('/api/activities', {params: {activityId}})
  .then(() => {
    dispatch(getActivitiesForDate(dateOfActivity, tripId))
  })
  .catch(err => {
    console.error('couldnt delete activity:', err)
  })
}

const exportItinerary = (accessToken) => (dispatch, getState) => {
  const tripId = getState().tripReducer.currentTrip.trip_id
  const city = getState().tripReducer.currentTrip.city
  axios.post('/api/itinerary', {
    params: {
      accessToken: accessToken,
      tripId: tripId,
      city: city,
    }
  })
}

const clearActivities = () => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.CLEAR_ACTIVITIES,
    activities: []
  })  

}

export default {
  createTrip,
  getAllTrips,
  setCurrentTrip,
  deleteTrip,
  addMember,
  sendInvite,
  deleteInvite,
  getPendingInvites,
  getTripMembers,
  deleteTripMember,
  getActivitiesForDate,
  addCustomActivity,
  addActivityToItinerary,
  updateActivity,
  deleteActivity,
  exportItinerary,
  clearActivities,
};
