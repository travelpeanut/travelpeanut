import ActionTypes from '../constants/ActionTypes';

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHAT_MESSAGES':
      return { ...state, messages: action.messages };
    default:
      return { ...state };
  }
};

export default chatReducer;
