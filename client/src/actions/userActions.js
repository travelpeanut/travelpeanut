import axios from 'axios';
import { push } from 'react-router-redux';
import ActionTypes from '../constants/ActionTypes';
import { auth } from '../../../firebase';

const checkLogin = input => (dispatch, getState) => {
  // ping the database with the login
  // see if the username exists
  // if it does not exist, throw an alert message
  // if the password does not match, alert the password is not matching
  // if the password matches, dispatch an action to change the state
  axios.get('/api/login', {
    params: input,
  })
    .then((data) => {
      Promise.resolve(dispatch({
        type: ActionTypes.CHECK_LOGIN,
        payload: data.data,
      }))
        .then(() => dispatch(push('/home')));
    })
    .catch((error) => {
      window.alert('Incorrect Username or Password. Please try again!');
    });
};

const loginGoogle = () => (dispatch) => {
  let user;
  let data;
  let imgUrl;

  auth.signInWithPopup()
    .then((result) => {
      user = result.user;
      // const token = result.credential.accessToken
      localStorage.setItem('accessToken', result.credential.accessToken)
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
  localStorage.removeItem('accessToken');
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


export {
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
