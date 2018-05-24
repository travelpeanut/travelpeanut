import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import * as discoveryActions from '../actions/discoveryActions.js'
import Places from '../../src/components/Places.jsx'
import Popup from '../components/AddFromDiscoverPopup.jsx'
import BackBtn from '../components/BackButton.jsx'

class BrowsePlaces extends React.Component {
  constructor(props) {    
    super(props);
    this.redirectAddPlace = this.redirectAddPlace.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.handleShowPopup = this.handleShowPopup.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.state = {
      show: 'none',
    }
  }

  redirectAddPlace(place){
    let placeName = place.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }

  handleClosePopup(){
    this.setState({
      show: 'none'
    })
  }

  handleShowPopup() {
    this.setState({
      show: 'block',
    });
  }

  handleBack(){
    let {id} = this.props.tripState.currentTrip
    this.props.history.push(`/trip/${id}/discovery`)

  }
 
   
  render() {
    const places = this.props.discoveryState.places
    return(
      <div className="yelp">
        {/* <div className="discoverResults-back" > */}
          <BackBtn classname={"discoverResults-backBtn"} content={"Back to Discover Menu"} handleBack={this.handleBack}/>
        {/* </div> */}

        <Popup show={this.state.show}  handleClosePopup={this.handleClosePopup}/>


        <div className="discoverResults-container">
          {places.map((place, key) => {
            return (
              <Places
                {...this.props}
                key={place.id}
                place={place}
                handleShowPopup={this.handleShowPopup}
              />           
              )
          })}
        </div>

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
  