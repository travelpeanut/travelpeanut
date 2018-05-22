import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { GOOGLE_PLACES, unsplashAPI } from '../../../config'
import * as discoveryActions from '../actions/discoveryActions.js'

class Places extends React.Component {
  constructor(props) {
    super(props)
    this.state = {      
    }
    this.addToItenerary = this.addToItenerary.bind(this)
    this.redirectAddPlace = this.redirectAddPlace.bind(this)
  }

  addToItenerary() {
    const place = this.props.place    
    this.props.actions.stagePlace(place)
    setTimeout(() => this.redirectAddPlace(place.name), 1000)    
  }

  redirectAddPlace(){
    console.log("place: ", this.props.place)
    console.log('this.props: ', this.props)
    let placeName = this.props.place.name.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }

  render() {
    console.log('places component: ', this.props.name)
    return (
      <div>
        <h3>{this.props.name}</h3>
        <h4>{this.props.vicinity}</h4>      
        <div className="google">
          <iframe className="google-map" src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_PLACES}&q=${this.props.lat},${this.props.lng}`}></iframe>
        </div>
        <div>rating: {this.props.rating}</div>
        <button className="addToItenerary" onClick={this.addToItenerary}>add to trip</button>
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
)(Places);


 {/* <div className="" key={place.id}>
              <h3>{place.name}</h3>
              <h4>{place.vicinity}</h4>

              <div className="google">
                <iframe className="google-map" src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_PLACES}&q=${place.geometry.location.lat},${place.geometry.location.lng}`}></iframe>
              </div>
              
              <p>rating: {place.rating}</p>
              <button className="addToItinerary" onClick={() => this.addToItinerary(place)}>Add To Itinerary</button>
                
              <hr />
            </div> */}