import ActionTypes from '../constants/ActionTypes';
import { push } from 'react-router-redux';
import axios from 'axios';

const getAllTrips = userId => (dispatch, getState) => {
  axios.get('/api/trips', {
    params: {
      userId,
    },
  })
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_ALL_TRIPS,
        code: res.data.rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


const createTrip = data => (dispatch, getState) => {
  // console.log('in actions:', data)
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data,
  });
  axios.post('/api/newTrip', data)
    .then(() => axios.get('/api/tripId', { params: { id: data.ownerId } }))
    .then((response) => {
      // console.log('got new trip id: ', response);
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
  dispatch(push(`/trip/${item.user_id}`));
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
const addMember = (userId, tripId) => (dispatch, getState) => {
  // console.log('herereeee', userId, tripId)
  axios.post('/api/trip/members', {
    params: {
      userId,
      tripId,
    },
  })
    .then((data) => {
    // console.log('data: ', data);
      dispatch({
        type: ActionTypes.ADD_MEMBER,
        member: data.data,
      });
    });
};

const getTripMembers = tripId => (dispatch, getState) => {
  axios.get('/api/trip/members', {
    params: {
      tripId,
    },
  })
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_TRIP_MEMBERS,
        members: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteTripMember = (memberId, tripId) => (dispatch, getState) => {
  axios.delete('/api/trip/members', {
    data: {
      memberId,
      tripId,
    },
  })
    .then(() => {
      dispatch(getTripMembers(tripId));
    })
    .catch((err) => {
      console.error(err);
    });
};


const getPendingInvites = (userId, tripId) => (dispatch, getState) => {
  axios.get('/api/trip/invite', {
    params: {
      userId,
      userId,
      tripId,
      tripId,
    },
  })
    .then((data) => {
      dispatch({
        type: ActionTypes.GET_PENDING_INVITES,
        pendingInvites: data.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendInvite = (email, tripId, ownerId, ownerEmail, firstName, city) => (dispatch, getState) => {
  axios.post('/api/trip/invite', {
    params: {
      email,
      tripId,
      ownerId,
      ownerEmail,
      firstName,
      city,
    },
  })
    .then(() => {
      dispatch(getPendingInvites(ownerId, tripId));
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteInvite = (email, tripId, ownerId) => (dispatch, getState) => {
  axios.delete('/api/trip/invite', {
    params: {
      email,
      tripId,
    },
  })
    .then(() => {
      dispatch(getPendingInvites(ownerId, tripId));
    })
    .catch((error) => {
      console.error(error);
    });
};

const getActivitiesForDate = (date, trip) => (dispatch, getState) => {
  axios.get('/api/getActivities', { params: { date, trip } })
    .then((success) => {
      console.log('got activites!', success.data.rows);
      dispatch({
        type: ActionTypes.GET_ACTIVITIES,
        code: success.data.rows,
      });
    })
    .catch((err) => {
      console.log('couldnt get activities from db', err);
    });
};


module.exports = {
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
};
