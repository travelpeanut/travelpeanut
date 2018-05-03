import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
  }

 

  
  render() {
    return(
      <div>
       <h1>This is Trip: </h1>

       <p>day 1</p>

       <p>day 2 ..</p>

       
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
)(TripItinerary);
