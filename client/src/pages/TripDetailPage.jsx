import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class TripDetail extends React.Component {
  constructor(props) {
    super(props)
  }

 

  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];

    return(
      <div>
        <h1>Trip Details: Day 1 in {tripName}</h1>

        <p>8am: blah..</p>
       
      </div>
    )
  }



}


export default connect(
  state => ({
      tripState: state.tripReducer,
  }),
  dispatch => ({
      actions: bindActionCreators( tripActions , dispatch)
  })
)(TripDetail);
