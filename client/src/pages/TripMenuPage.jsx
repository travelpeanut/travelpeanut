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
    let tripName = window.location.pathname.split( '/' )[2];
    switch(type){
      case 'itinerary':
        this.props.history.push(`/trip/${tripName}/itinerary`)
        break
      case 'discover':
        this.props.history.push(`/trip/${tripName}/discovery`)
        break
      case 'members':
        this.props.history.push(`/trip/${tripName}/members`)
        break
      default:
        break

    }
  }

 

  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];

    return(
      <div>
        <h1>Trip Menu for: {tripName}</h1>

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
