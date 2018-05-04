import ActionTypes from '../constants/ActionTypes'
import { push } from 'react-router-redux'
import axios from 'axios'


const storeSomething = (input) => (dispatch, getState) => {
  console.log('in actions:', input)
  dispatch({
    type: ActionTypes.STORE_SOMETHING,
    code: input
  }) 

  dispatch(push(`/home`));


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

module.exports = {
  goToLogin: goToLogin,
  storeSomething: storeSomething,
  signUp: signUp,
  goToSignup: goToSignup
} 
