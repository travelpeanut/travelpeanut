import ActionTypes from '../constants/ActionTypes';

const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return { ...state, comments: action.comments };
    default:
      return { ...state };
  }
};

export default commentReducer;
