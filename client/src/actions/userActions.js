import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { auth } from '../../../firebase';

const loginGoogle = () => (dispatch) => {  
  let user;
  let data;
  let imgUrl;

  auth.signInWithPopup()
    .then((result) => {
      user = result.user;
      console.log('resulttttt', result)
      return user.getIdToken();
    })
    .then((token) => {      
      const strToken = token.toString();

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const info = JSON.parse(window.atob(base64));

      data = {
        email: info.email,
        firstName: info.name.split(' ')[0],
        lastName: info.name.split(' ')[1],
        uid: info.user_id,
      };

      imgUrl = info.picture;

      return axios.get('/api/login', {
        params: data,
      });
    })
    .then((res) => {
      data = Object.assign({ id: res.data.userId, imgUrl }, data);

      dispatch({
        type: ActionTypes.CHECK_LOGIN,
        payload: data,
      });

      localStorage.setItem('userToken', data.uid);
    })
    .then(() => {
      dispatch(push('/home'));
    })
    .catch((err) => {
      console.error('sign in err: ', err);
    });
};

const goToLogin = () => (dispatch, getState) => {
  dispatch(push('/login'));
};

const goToSignup = () => (dispatch, getState) => {
  dispatch(push('/signup'));
};

const signUp = data => (dispatch, getState) => {
  axios.post('/api/users', data)
    .then((response) => {
      dispatch(push('/login'));
    })
    .catch((err) => {
      console.error('ERROR IN signUp function: ', err);
    });
};

const logOut = () => (dispatch, getState) => {  
  dispatch({
    type: ActionTypes.LOGOUT_USER,
  });
  localStorage.removeItem('userToken');
  dispatch(push(`/`));
}

const getInvitations = () => (dispatch, getState) => {
  const { email } = getState().userReducer.currentUser;  
  axios.get('/api/invitations', {
    params: {
      email,
    },
  })
    .then(({ data }) => {      
      dispatch({
        type: ActionTypes.GET_INVITATIONS,
        invitations: data,
      });
    });
};

const acceptInvitation = (email, tripId) => (dispatch, getState) => {    
  axios.delete('/api/invitations', {
    params: {
      email,
      tripId,
    },
  })
    .then(() => dispatch(getInvitations()));
};

const rejectInvitation = (email, tripId) => (dispatch, getState) => {
  axios.delete('/api/invitations', {
    params: {
      email,
      tripId,
    },
  })
    .then(() => dispatch(getInvitations()));
};


module.exports = {
  goToLogin,
  loginGoogle,
  // checkLogin,
  signUp,
  goToSignup,
  logOut,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
};
