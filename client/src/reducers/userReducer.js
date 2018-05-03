import ActionTypes from '../constants/ActionTypes'
import { updateObject, createReducer } from'./reducerUtils'


const initialState = {
  userInfo: {},
  something: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_SOMETHING':
      return Object.assign({}, state, {
        something: action.code
      })
  


    default:
      return Object.assign({}, state)
  }
}

export default userReducer
