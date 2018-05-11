import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'
import firebase, {auth} from '../../../firebase'


const checkLogin = (input) => (dispatch, getState) => {
  //ping the database with the login
  //see if the username exists
  //if it does not exist, throw an alert message
  //if the password does not match, alert the password is not matching
  //if the password matches, dispatch an action to change the state
  axios.get('/api/login', {
    params: input
  })
  .then((data) => {
    Promise.resolve(dispatch({
      type: ActionTypes.CHECK_LOGIN,
      payload: data.data
    }))
    .then(() => dispatch(push(`/home`)))
  })
  .catch((error) => {
    window.alert('Incorrect Username or Password. Please try again!')
  })
}

const loginGoogle = () => (dispatch) => {
  console.log('actions log goog')
  let user, data, imgUrl;

  auth.signInWithPopup() 
  .then((result) => {
    user = result.user
    // const token = result.credential.accessToken
    return user.getIdToken()
  })
  .then((token) => {
    console.log('actions==========', token)
    let strToken = token.toString();

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    let info =  JSON.parse(window.atob(base64));

    data = {
      email: info.email,
      firstName: info.name.split(' ')[0],
      lastName: info.name.split(' ')[1],
      uid: info.user_id
    }

    imgUrl = info.picture

    return axios.get('/api/login', {
      params: data
    })
  })
  .then((res) => {
    data = Object.assign({id: res.data.userId, imgUrl: imgUrl}, data)

    dispatch({
      type: ActionTypes.CHECK_LOGIN,
      payload: data
    })

    localStorage.setItem('userToken', data.uid)
  })
  .then(() => {
    dispatch(push(`/home`))
  })
  .catch((err) => {
    console.log('sign in err: ', err)
  })

}

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
  localStorage.removeItem('userToken');
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
  loginGoogle: loginGoogle,
  checkLogin: checkLogin,  
  signUp: signUp,
  goToSignup: goToSignup,
  logOut: logOut,
  getInvitations: getInvitations,
  acceptInvitation: acceptInvitation,
  rejectInvitation: rejectInvitation
}
