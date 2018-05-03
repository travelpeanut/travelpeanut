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

module.exports = {
  goToLogin: goToLogin,
  storeSomething: storeSomething
} 
