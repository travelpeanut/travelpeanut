import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails(){
    let tripName = window.location.pathname.split( '/' )[2];
    this.props.history.push(`/trip/${tripName}/details`)
  }


  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];

    return(
      <div>
       <h1>This is Trip: {tripName}</h1>

       <p>day 1</p>
       <button onClick={this.redirectToDetails}>View Details</button>

       <p>day 2 ..</p>
       <button onClick={this.redirectToDetails}>View Details</button>

       
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
