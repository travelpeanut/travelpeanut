import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import * as discoveryActions from '../actions/discoveryActions.js'
import Places from '../../src/components/Places.jsx'

class BrowsePlaces extends React.Component {
  constructor(props) {    
    super(props);
    this.redirectAddPlace = this.redirectAddPlace.bind(this)
  }

  componentWillMount(){
    // console.log('this.props.discoveryState: ', this.props.discoveryState)
    // console.log('places: ', places)
    // let categoryName = window.location.pathname.split( '/' )[4];
  }

  redirectAddPlace(place){
    let placeName = place.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }
   
  render() {
    const places = this.props.discoveryState.places
    return(
      <div className="yelp">
        {places.map((place, key) => {
          return (
            <Places
              {...this.props}
              key={place.id}
              place={place}
            />           
            )
          })}
      </div>
    )
  }
}

export default connect(
    state => ({
        tripState: state.tripReducer,
        discoveryState: state.discoveryReducer,
    }),
    dispatch => ({
        actions: bindActionCreators( discoveryActions , dispatch)
    })
  )(BrowsePlaces);
  