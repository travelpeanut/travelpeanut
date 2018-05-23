import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { GOOGLE_PLACES, unsplashAPI } from '../../../config'
import * as discoveryActions from '../actions/discoveryActions.js'

class Places extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: this.props.place      
    }
    this.addToItenerary = this.addToItenerary.bind(this)
    this.redirectAddPlace = this.redirectAddPlace.bind(this)
  }

  componentWillMount() {
    this.setState({
      places: null
    })
  }

  addToItenerary() {
    const place = this.props.place    
    this.props.actions.stagePlace(place)
    this.redirectAddPlace(place.name)
  }

  redirectAddPlace(){        
    let placeName = this.props.place.name.trim()
    let tripCity = this.props.tripState.currentTrip.city.trim()
    let discoverType = window.location.pathname.split(`/`)[4];
    this.props.history.push(`/trip/${tripCity}/discovery/${discoverType}/${placeName}/addToItinerary`)
  }

  render() {
    return (
      <div>

        <div>
          <a href={this.state.place.url} target="_blank">{this.state.place.name}</a>
          <h4>{this.state.place.location.display_address[0].concat(this.state.place.location.display_address[1])}</h4>
          <div>phone number: {this.state.place.display_phone}</div>      
          <span>rating: {this.state.place.rating} || </span>
          <span>reviews: {this.state.place.review_count}</span>
          <div>price: {this.state.place.price}</div>
        </div>

        <button className="addToItenerary" onClick={this.addToItenerary}>add to trip</button>

        <div>
          <img src={this.state.place.image_url}/>
        </div>
        <div className="google">
          <iframe className="google-map" src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_PLACES}&q=${this.state.place.name}`}></iframe>
        </div>
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
