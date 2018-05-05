import ActionTypes from '../constants/ActionTypes'
import { updateObject, createReducer } from'./reducerUtils'

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

const initialState = {
  allTrips: [],
  currentTrip: {},
  currentDay: {},
  temp: {},
  tripCoordinates: ''
}

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TRIP':
      return Object.assign({}, state, {
        temp: action.code
      })



    default:
      return Object.assign({}, state)
  }
}

export default tripReducer
