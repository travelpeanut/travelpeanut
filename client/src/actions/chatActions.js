import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { fbDb } from '../../../firebase/firebase';

const getMessages = () => (dispatch, getState) => {
  const { trip_id } = getState().tripReducer.currentTrip;
  console.log('getting messages for this tripId: ', trip_id)
  fbDb.child(`${trip_id}/messages`)
    .on('value', (snapshot) => {
      let messages = snapshot.val();
      messages = Object.keys(messages).map(key => [key, messages[key]]);
      dispatch({
        type: ActionTypes.GET_CHAT_MESSAGES,
        messages,
      });
    });
};

const sendMessage = message => (dispatch, getState) => {
  const { email, firstName, id, imgUrl, lastName } = getState().userReducer.currentUser;
  const { trip_id } = getState().tripReducer.currentTrip;
  const payload = {
    user_id: id,
    message,
    email,
    firstName,
    lastName,
    imgUrl,
  };
  fbDb.child(`${trip_id}/messages`).push(payload)
    .then(() => {
      dispatch(getMessages);
    });
};

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
