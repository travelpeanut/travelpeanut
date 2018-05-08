import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tripActions from '../actions/tripActions.js'
import axios from 'axios';

class BrowsePlaces extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        let categoryName = window.location.pathname.split( '/' )[4];
    }
      
  render() {
    let places = this.props.tripState.nearbyPlaces
    return(
      <div>
        <h1>Browse Places: {this.props.tripState.destination.name}</h1>
        {typeof places.data !== 'undefined' && places.data.map((place, key) => {
            return (
                <div>
                  <h3 key={place.id}>{place.name}</h3>
                  <p>rating: {place.rating}</p>
                </div>
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
        actions: bindActionCreators( tripActions , dispatch)
    })
  )(BrowsePlaces);
  