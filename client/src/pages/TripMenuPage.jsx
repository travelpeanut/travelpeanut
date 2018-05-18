import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'


class TripMenu extends React.Component {
  constructor(props) {
    super(props)

    this.redirectItinerary = this.redirectItinerary.bind(this)


  }

  redirectItinerary(type){    
    let { trip_id } = this.props.tripState.currentTrip
    // let {user_id} = this.props.tripState.currentTrip
    switch(type){
      case 'itinerary':
        this.props.history.push(`/trip/${trip_id}/itinerary`)
        break
      case 'discover':
        this.props.history.push(`/trip/${trip_id}/discovery`)
        break
      case 'members':
        this.props.history.push(`/trip/${trip_id}/members`)
        break
      default:
        break

    }
  }

 

  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];
    let {currentTrip} = this.props.tripState

    return(
      <div>
        <h1>Trip Menu for: {currentTrip.title}</h1>

        <br/>
        <button onClick={() => { this.redirectItinerary('itinerary') }}>View/Edit Itinerary</button>
        <br/>
        <button onClick={() => { this.redirectItinerary('discover')}}>Discover Places</button>
        <br/>
        <button onClick={() => { this.redirectItinerary('members')}}>View/Add Members for this Trip</button>

       
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
