import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const getAllTrips = (userId) => (dispatch, getState) => {
  axios.get('/api/trips', {
    params: {
      userId: userId
    }
  })
  .then((res) => {
    dispatch({
      type: ActionTypes.GET_ALL_TRIPS,
      code: res.data.rows
    }) 
  })
  .catch((err) => {
    console.log(err);
  })

}


const createTrip = (data) => (dispatch, getState) => {
  console.log('in actions:', data)
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data
  }) 
  axios.post('/api/newTrip', data)
    .then( (response) => {      
      axios.get('/api/tripId', {params: {id: data.ownerId}})
        .then((response) => {
          console.log('got new trip id: ', response);
          let newTripId = response.data.id
          axios.post('/api/usersByTrips',{
            newTripId: newTripId,
            ownerId: data.ownerId
          })
            .then( (response) => {
              dispatch(push(`/trip/${data.name}`));      
            })
            .catch((err) => {

            })
        })
        .catch((err) => {

        })

      
    })
    .catch( (err) => {

    })




}

const setCurrentTrip = (item) => (dispatch, getState) => {
  dispatch({
    type: ActionTypes.SET_CURRENT_TRIP,
    code: item
  })

  dispatch(push(`/trip/${item.user_id}`));  

}

const deleteTrip = (tripId) => (dispatch, getState) => {
  axios.delete('/api/trips', {data: {tripId: tripId}})
  .then(() => {
    console.log('delete success')
    this.getAllTrips()
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = {
  createTrip: createTrip,
  getAllTrips: getAllTrips,
  setCurrentTrip: setCurrentTrip,
  deleteTrip: deleteTrip
} 
