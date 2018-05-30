import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { fbDb } from '../../../firebase/firebase';

const getComments = (activityId) => (dispatch, getState) => {
  const { trip_id } = getState().tripReducer.currentTrip;    
  fbDb.child(`${trip_id}/activities`)
    .on('value', (snapshot) => {
      let comments = snapshot.val() || {};      
      comments = Object.keys(comments).map(key => [key, comments[key]]);      
      dispatch({
        type: ActionTypes.GET_COMMENTS,
        comments,
      });
    });
};

const sendComment = (comment, activityId) => (dispatch, getState) => {  
  const { email, firstName, id, imgUrl, lastName } = getState().userReducer.currentUser;
  const { trip_id } = getState().tripReducer.currentTrip;
  const payload = {
    user_id: id,
    comment,
    email,
    firstName,
    lastName,
    imgUrl,
    activityId,
  };
  fbDb.child(`${trip_id}/activities/${activityId}/comments`).push(payload)
    .then(() => {
      dispatch(getComments(activityId));
    });
};

exports.getComments = getComments;
exports.sendComment = sendComment;
