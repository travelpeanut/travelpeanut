import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'

const goToLogin = () => (dispatch, getState) => {
  dispatch(push(`/login`));


  // const state = getState();
  // console.log('state',state)

  // axios.get('/hotels')
  // .then((response) => {
  //   console.log(response)
  //   dispatch({
  //     type: ActionTypes.GET_HOTELS_LIST,
  //     code: response
  //   }) 
  // })
  // .catch((err) => {
  //   console.log(err);
  // })

}

const goToSignup = () => (dispatch, getState) => {
  dispatch(push(`/signup`));
}

const signUp = (data) => (dispatch, getState) => {
  axios.post('/api/users', data)
    .then( (response) => {    
      dispatch(push(`/login`));      
    })
    .catch( (err) => {
      console.log('ERROR IN signUp function: ', err);
    })
}

const logOut = () => (dispatch, getState) =>  {  
  console.log('calling logOut')
  dispatch({
    type: ActionTypes.LOGOUT_USER    
  })
  dispatch(push(`/login`));
}

const getInvitations = (email) => (dispatch, getState) => {
  console.log('email', email)
  //pings the server -> database
  axios.get('/api/invitations', {
    params: {
      email: email
    }
  })
  .then((data) => {
    dispatch({
      type: ActionTypes.GET_INVITATIONS,
      invitations: data.data
    })
  })
}

const acceptInvitation = (email, tripId, userId) => (dispatch, getState) => {
  axios.delete('/api/invitations', {
    params: {
      email: email,
      tripId: tripId
    }
  })
  .then(() => dispatch(getInvitations(email)))
}

const rejectInvitation = (email, tripId) => (dispatch, getState) => {
  axios.delete('/api/invitations', {
    params: {
      email: email,
      tripId: tripId
    }
  })
  .then(() => dispatch(getInvitations(email)))
}


module.exports = {
  goToLogin: goToLogin,
  // storeSomething: storeSomething,
  checkLogin: checkLogin,  
  signUp: signUp,
  goToSignup: goToSignup,
  logOut: logOut,
  getInvitations: getInvitations,
  acceptInvitation: acceptInvitation,
  rejectInvitation: rejectInvitation
}
