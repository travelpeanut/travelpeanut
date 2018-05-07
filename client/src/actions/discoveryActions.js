import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const getCoordinatesByCity = (cityAndState) => (dispatch, getState) => {
    console.log('in discoveryActions: ', cityAndState)
    axios.get(`/api/getCoordinates`, {params: cityAndState})
    .then((cityData)=> {
        dispatch({
            type: ActionTypes.STORE_CITY_LOCATION,
            code: cityData
        })
    })
    .catch(err => {
        console.log('coudlnt get data :( :', err)
    })
}

const getNearbyPlacesByType = (types, coordinates) => (dispatch, getState) => {
    console.log('in getNearbyPlacesByType. type: ', types, 'coordinates:', coordinates)
    let placesToBrowse = []
    console.log('types is...', types)
    types.forEach(type => {
        axios.get(`/api/getNearbyPlacesByType`, {params: [type, coordinates]})
        .then(places => {
            placesToBrowse.push(places)
        })
        .catch(err => console.log('couldnt get places: ', err))
    })
    .then(nearbyPlaces => {
        console.log('got ALL nearby places: ', nearbyPlaces)
        dispatch({
            type: ActionTypes.STORE_NEARBY_PLACES,
            code: nearbyPlaces
        })
    })
    .catch(err => {
        console.log('couldnt get ALL nearbyplaces: ', err)
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