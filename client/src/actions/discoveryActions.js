import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const getCoordinatesByCity = (cityAndState) => (dispatch, getState) => {
    console.log('in discoveryActions: ', cityAndState)
    axios.get(`/api/getCoordinates`, {params: cityAndState})
    .then((cityData)=> {
        console.log('got data! : ', cityData)
        dispatch({
            type: ActionTypes.STORE_CITY_LOCATION,
            code: cityData
        })
    })
    .catch(err => {
        console.log('coudlnt get data :( :', err)
    })
    // dispatch({
    //     type: ActionTypes.STORE_SOMETHING,
    //     code: success
    // })
    // .catch(err => console.log('couldnt set coordinates:', err))
    // https://maps.googleapis.com/maps/api/geocode/json?address=MountainView,+CA&key=AIzaSyB0viycMhEqrmrdp841mv_wGEkHNGCrk_s
    //I don't think we need to dispatch push because we just want to update state
    //dispatch(push(`/trip/${}))

}

const createTrip = (data) => (dispatch, getState) => {
    console.log('in actions:', data)
    dispatch({
      type: ActionTypes.CREATE_TRIP,
      code: data
    }) 
  
    dispatch(push(`/trip/${data.name}`));
  
  }

  module.exports = {
    getCoordinatesByCity: getCoordinatesByCity,
    createTrip: createTrip
  }