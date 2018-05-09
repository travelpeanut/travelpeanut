import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tripActions from '../actions/tripActions.js'
import axios from 'axios';

class BrowsePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.addToItinerary = this.addToItinerary.bind(this)
  }


  componentWillMount(){
      let categoryName = window.location.pathname.split( '/' )[4];
      this.render, 5000;
  }

  addToItinerary(placeToAdd){
    
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
                  <button class="addToItinerary" onClick={this.addToItinerary(place)}>Add To Itinerary</button>
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
        actions: bindActionCreators( tripActions , dispatch)
    })
  )(BrowsePlaces);
  