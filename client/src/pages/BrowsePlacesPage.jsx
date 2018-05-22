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
    let places = this.props.tripState.nearbyPlaces
    let categoryName = window.location.pathname.split( '/' )[4];
    this.render, 5000;
  }

  redirectAddPlace(place){
    let placeName = place.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }
   
  render() {
    let places = this.props.tripState.nearbyPlaces
    console.log('places.data: ', places.data)          

    return(
      <div className="">
        {places.data.map((place, key) => {
          return (
            <Places
              {...this.props} 
              key={place.id}
              place={place}
              name={place.name}
              vicinity={place.vicinity}
              photoReference={place.reference}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
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
    }),
    dispatch => ({
        actions: bindActionCreators( discoveryActions , dispatch)
    })
  )(BrowsePlaces);
  