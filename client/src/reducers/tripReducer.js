import ActionTypes from '../constants/ActionTypes';

const initialState = {
  allTrips: [],
  currentTrip: {},
  currentDay: {},
  temp: {},
  tripCoordinates: {},
  tripMembers: [],
  nearbyPlaces: [],
  destination: {},
  pendingInvites: [],
  activitiesForThisDate: [],
  placeToAdd: {},
  photosList: [],
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TRIP':
      return Object.assign({}, state, {
        destination: action.code,
      });
    case 'GET_ALL_TRIPS':
      return Object.assign({}, state, {
        allTrips: action.code,
      });
    case 'SET_CURRENT_TRIP':
      return Object.assign({}, state, {
        currentTrip: action.code,
      });
    case 'STORE_CITY_LOCATION':
      return Object.assign({}, state, {
        tripCoordinates: action.code,
      });
    case 'ADD_MEMBER':
      return {
        ...state,
        tripMembers: [
          ...state.tripMembers,
          action.member,
        ],
      };
    case 'GET_TRIP_MEMBERS':
      return {
        ...state,
        tripMembers: action.members,
      };
    case 'GET_PENDING_INVITES':
      return {
        ...state,
        pendingInvites: action.pendingInvites,
      };
    case 'STAGE_PLACE_FOR_ITINERARY':
      return Object.assign({}, state, {
        placeToAdd: action.code,
      });
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activitiesForThisDate: action.activities,
      };      
    case 'CLEAR_ACTIVITIES':
      return {
        ...state,
        activitiesForThisDate: action.activities
      };
    case 'SET_PHOTOS':
      return {
        ...state,
        photosList: action.code
      }
    default:
      return Object.assign({}, state);
  }
};

export default tripReducer;
