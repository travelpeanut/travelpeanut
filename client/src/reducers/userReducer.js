import ActionTypes from '../constants/ActionTypes'
import { updateObject, createReducer } from'./reducerUtils'


const initialState = {
  userInfo: {},
  something: '',
  currentUser: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_SOMETHING':
      return Object.assign({}, state, {
        something: action.code
      })
    case 'CHECK_LOGIN':
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return Object.assign({}, state)
  }
}

export default userReducer
