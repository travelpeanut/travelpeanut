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
}

const getNearbyPlacesByType = (type, coordinates) => (dispatch, getState) => {
    console.log('in getNearbyPlacesByType. type: ', type, coordinates)
    axios.get(`/api/getNearbyPlacesByType`, {params: type, coordinates})
    .then(nearbyPlaces => {
        console.log('got nearby places: ', nearbyPlaces)
        dispatch({
            type: ActionTypes.STORE_NEARBY_PLACES,
            code: nearbyPlaces
        })
    })
    .catch(err => {
        console.log('couldnt get nearbyplaces: ', err)
    })
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
    getNearbyPlacesByType: getNearbyPlacesByType,
    createTrip: createTrip
  }