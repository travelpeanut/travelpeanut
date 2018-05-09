import ActionTypes from '../constants/ActionTypes'
import { updateObject, createReducer } from'./reducerUtils'

const initialState = {
  allTrips: [],
  currentTrip: {},
  currentDay: {},
  temp: {},
  tripCoordinates: {},
  tripMembers: [],
  nearbyPlaces: [],
  destination: {},
  pendingInvites: []
}

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TRIP':
      return Object.assign({}, state, {
        //ryan: added destination to stop using temp. temp is no longer used throughout the app, AFAIK. Realized temp and destination not being used...might delete this entire action? 
        temp: action.code,
        destination: action.code
      })
    case 'GET_ALL_TRIPS':
      return Object.assign({}, state, {
        allTrips: action.code
      })
    case 'SET_CURRENT_TRIP':
      console.log(action.code)
      return Object.assign({}, state, {
        currentTrip: action.code
      })
    case 'STORE_CITY_LOCATION':
      return Object.assign({}, state, {
        tripCoordinates: action.code
      })
    case 'STORE_NEARBY_PLACES':
      return Object.assign({}, state, {
        nearbyPlaces: action.code
      })
    case 'ADD_MEMBER':
      return {...state,
        tripMembers: [
          ...state.tripMembers, 
          action.member
      ]}
    case 'GET_TRIP_MEMBERS': 
      return {...state,
        tripMembers: action.members
      }
    case 'GET_PENDING_INVITES':
      return {...state,
        pendingInvites: action.pendingInvites
      }
    default:
      return Object.assign({}, state)
  }
}

export default tripReducer
