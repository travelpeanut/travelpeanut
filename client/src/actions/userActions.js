import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'


const checkLogin = (input) => (dispatch, getState) => {
  //ping the database with the login
  //see if the username exists
  //if it does not exist, throw an alert message
  //if the password does not match, alert the password is not matching
  //if the password matches, dispatch an action to change the state
  axios.get('/api/users', {
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

  // make axios request to server endpoint (create user endpoint)
  
  console.log('in signup function: adding user: ', data);
  axios.post('/api/users', data)
    .then( (response) => {
    // after sign up,
    // redirect to login page
      dispatch(push(`/login`));      
    })
    .catch( (err) => {
      console.log('ERROR IN signUp function: ', err);
    })



}

module.exports = {
  goToLogin: goToLogin,
  // storeSomething: storeSomething,
  checkLogin: checkLogin,  
  storeSomething: storeSomething,
  signUp: signUp,
  goToSignup: goToSignup
} 
