import ActionTypes from '../constants/ActionTypes'
import { updateObject, createReducer } from'./reducerUtils'


const initialState = {
  allTrips: [],
  currentTrip: {},
  currentDay: {},
  temp: {},
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
