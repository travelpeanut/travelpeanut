import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';

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
  // console.log('in getNearbyPlacesByType. type: ', types, 'coordinates:', coordinates)
  // console.log('types is...', types)
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



module.exports = {
  getCoordinatesByCity,
  getNearbyPlacesByType,
  createTrip,
  stagePlace
};
