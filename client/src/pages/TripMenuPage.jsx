import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'


class TripMenu extends React.Component {
  constructor(props) {
    super(props)

    this.redirectItinerary = this.redirectItinerary.bind(this)


  }

  redirectItinerary(){
    let tripName = window.location.pathname.split( '/' )[2];
    // console.log(pathArray);
    this.props.history.push(`/trip/${tripName}/itinerary`)
  }

 

  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];

    return(
      <div>
        <h1>Trip Menu for: {tripName}</h1>

        <br/>
        <button onClick={this.redirectItinerary}>View/Edit Itinerary</button>
        <br/>
        <button>Discover Places</button>
        <br/>
        <button>View/Add Members for this Trip</button>

       
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
)(TripMenu);
