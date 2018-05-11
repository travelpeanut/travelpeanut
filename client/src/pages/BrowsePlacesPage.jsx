import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as discoveryActions from '../actions/discoveryActions.js'
import axios from 'axios';

class BrowsePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.addToItinerary = this.addToItinerary.bind(this)
    this.redirectAddPlace = this.redirectAddPlace.bind(this)
  }


  componentWillMount(){
      let categoryName = window.location.pathname.split( '/' )[4];
      this.render, 5000;
  }

  addToItinerary(placeToAdd){
    //set state to have clicked place.
    this.props.actions.stagePlace(placeToAdd)
    setTimeout(() => this.redirectAddPlace(placeToAdd.name), 1000)
  }

  redirectAddPlace(place){
    let placeName = place.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }
      
  render() {
    let places = this.props.tripState.nearbyPlaces
    let i = 0;
    return(
      <div>
        <h1>Browse Places: {this.props.tripState.currentTrip.name}</h1>
        {typeof places.data !== 'undefined' && places.data.map((place, key) => {
          return (
            <div key={place.id}>
                  <h3>{place.name}</h3>
                  <div><img src={place.icon}/></div>
                  <p>rating: {place.rating}</p>
                  <button className="addToItinerary" onClick={() => this.addToItinerary(place)}>Add To Itinerary</button>
                  <hr />
                </div>
            )
          })}
          {console.log('tripstate!:', this.props.tripState)}
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
  