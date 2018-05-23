import ActionTypes from '../constants/ActionTypes'

const initialState = {
  places: []
};

const discoveryReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'STORE_NEARBY_PLACES':
      return {...state, places: action.places}
    default:
      return {...state}
  }
}

export default discoveryReducer