import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { GOOGLE_PLACES, unsplashAPI } from '../../../config'

const getCoordinatesByCity = cityAndState => (dispatch, getState) => {
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

const getNearbyPlacesByType = (types, location) => (dispatch, getState) => {  
  axios.get('/api/getNearbyPlacesByType', { params: {types, location,}})
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.STORE_NEARBY_PLACES,
        places: data,
      });
    })
    .catch((err) => {
      console.error('couldnt get ALL nearbyplaces: ', err);
    });
};

const createTrip = data => (dispatch, getState) => {  
  dispatch({
    type: ActionTypes.CREATE_TRIP,
    code: data,
  });

  dispatch(push(`/trip/${data.name}`));
};

const stagePlace = place => (dispatch, getState) => {  
  dispatch({
    type: ActionTypes.STAGE_PLACE_FOR_ITINERARY,
    code: place,
  });
};

const getPlacesPhotos = place => (dispatch, getState) => {  
  axios.get('api/discoveryPhotos')
    .then((response) => {      
      dispatch({
        type: ActionTypes.GET_PLACES_PHOTOS,
        payload: photoReference
      })
    })
}


export {
  getCoordinatesByCity,
  getNearbyPlacesByType,
  createTrip,
  stagePlace,
  getPlacesPhotos
};
