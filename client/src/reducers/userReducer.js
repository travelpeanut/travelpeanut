import ActionTypes from '../constants/ActionTypes';


const initialState = {
  userInfo: {},
  something: '',
  currentUser: {},
  invitations: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_SOMETHING':
      return Object.assign({}, state, {
        something: action.code,
      });
    case 'CHECK_LOGIN':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'LOGOUT_USER':
      return initialState;
    case 'GET_INVITATIONS':
      return {
        ...state,
        invitations: action.invitations,
      };
    default:
      return Object.assign({}, state);
  }
};

export default userReducer;
