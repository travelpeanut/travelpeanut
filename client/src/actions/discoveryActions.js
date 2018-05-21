import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { GOOGLE_PLACES } from '../../../config'

const getCoordinatesByCity = cityAndState => (dispatch, getState) => {
  // console.log('in discoveryActions: ', cityAndState)
  axios.get('/api/getCoordinates', { params: cityAndState })
    .then((cityData) => {
      dispatch({
        type: ActionTypes.STORE_CITY_LOCATION,
        code: cityData,
      });
    })
    .catch((err) => {
      console.error('coudlnt get data :( :', err);
    });
};

const getNearbyPlacesByType = (types, coordinates) => (dispatch, getState) => {  
  axios.get('/api/getNearbyPlacesByType', { params: [types, coordinates.lat, coordinates.lng] })
    .then((nearbyPlaces) => {
      // console.log('got ALL nearby places: ', nearbyPlaces)
      dispatch({
        type: ActionTypes.STORE_NEARBY_PLACES,
        code: nearbyPlaces,
      });
    })
    .catch((err) => {
      console.error('couldnt get ALL nearbyplaces: ', err);
    });
};

const createTrip = data => (dispatch, getState) => {
  console.log('in actions:', data);
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data,
  });

  dispatch(push(`/trip/${data.name}`));
};

const stagePlace = place => (dispatch, getState) => {
  console.log('clicked on this place:', place);
  dispatch({
    type: ActionTypes.STAGE_PLACE_FOR_ITINERARY,
    code: place,
  });
};

const getPlacesPhotos = photoReference => (dispatch, getState) => {
  console.log('getting photos for this reference: ', photoReference)
  const photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_PLACES}`
  axios.get(photoURL)
    .then((response) => {
      console.log('response.data from getPlacesPhotos: ', response.data)
      dispatch({
        type: ActionTypes.GET_PLACES_PHOTOS,
        payload: photoReference
      })
    })
}


module.exports = {
  getCoordinatesByCity,
  getNearbyPlacesByType,
  createTrip,
  stagePlace,
  getPlacesPhotos
};
