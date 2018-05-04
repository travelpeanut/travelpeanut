import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const getAllTrips = () => (dispatch, getState) => {

}


const createTrip = (data) => (dispatch, getState) => {
  console.log('in actions:', data)
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data
  }) 
  axios.post('/api/trips')
    .then( (response) => {
      dispatch(push(`/trip/${data.name}`));

    })
    .catch( (err) => {

    })




}

const setCurrentTrip = () => (dispatch, getState) => {

}


module.exports = {
  createTrip: createTrip,
  getAllTrips: getAllTrips,
  setCurrentTrip: setCurrentTrip
} 
