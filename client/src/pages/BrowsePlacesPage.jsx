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

        // this.props.tripState.geolocation


        //api request to google
            //input is category name and locations
    }
      
  render() {

    return(
      <div>
        <h1>Browse Places: {tripName}</h1>
        {props.browseplaces.map(place => {
            return (
                <div>{place.name}</div>
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
  