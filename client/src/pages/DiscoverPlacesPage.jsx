import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as discoverActions from '../actions/discoveryActions'


class Discovery extends React.Component {
  constructor(props) {
    super(props);
    this.redirectDiscover = this.redirectDiscover.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount(){
    let addressString = this.props.tripState.temp.city + ',' + this.props.tripState.temp.country;
    // console.log('stringToUse for address:', addressString)
    this.props.actions.getCoordinatesByCity(addressString)
    // console.log('typeof trip coordinates', typeof this.props.tripState.tripCoordinates.data.coordinates) ... this was object
  }

  clickHandler(placeType){
    // console.log('state:', this.props.tripState, 'placeType[0]:', placeType[0], 'placeType[1]:', placeType[1])
    this.getPlaces(placeType[1], this.props.tripState.tripCoordinates.data.coordinates)
    this.redirectDiscover(placeType[0])
  }

  getPlaces(placeTypes, coordinates){
    this.props.actions.getNearbyPlacesByType(placeTypes, coordinates)
    // this.props.actions.getNearbyPlacesByType(placeTypes, this.props.tripState.tripCoordinates.data.coordinates)
  }

  redirectDiscover(type){
      let tripName = window.location.pathname.split('/')[2];
      switch(type){
        case 'museums':
            this.props.history.push(`/trip/${tripName}/discovery/museums`)
            break
        case 'bars_clubs':
            this.props.history.push(`/trip/${tripName}/discovery/bars_clubs`)
            break
        case 'spa_salon':
            this.props.history.push(`/trip/${tripName}/discovery/spa_salon`)
            break
        case 'food_drink':
            this.props.history.push(`/trip/${tripName}/discovery/food_drink`)
            break
        case 'shopping':
            this.props.history.push(`/trip/${tripName}/discovery/shopping`)
            break
        case 'camping':
            this.props.history.push(`/trip/${tripName}/discovery/camping`)
            break
        case 'movies_bowling_amusement':
            this.props.history.push(`/trip/${tripName}/discovery/movies_bowling_amusement`)
            break
        case 'stadiums':
            this.props.history.push(`/trip/${tripName}/discovery/stadiums`)
            break
        case 'grocery':
            this.props.history.push(`/trip/${tripName}/discovery/grocery`)
            break
      }
  }

  render() {
    return (
      <div>
        <h1>Discover Places</h1>
        <div onClick={() => {this.clickHandler(['museums', ['aquarium', 'art_gallery', 'museum', 'library']])}}>
        aquarium
        <br />
        art_gallery
        <br />
        museum
        <br />
        library
        </div>
        <hr />
        <div value = {['bars_clubs', ['night_club', 'bar']]} onClick={() => {this.clickHandler()}}>
        night_club
        <br />
        bar
        </div>
        <hr />
        <div value = {['spa_salon', ['beauty_salon', 'spa']]} onClick={() => {this.clickHandler()}}>
        beauty_salon
        <br />
        spa
        </div>
        <hr />
        <div value = {['food_drink', ['restaurant', 'bakery', 'cafe']]} onClick={() => {this.clickHandler()}}>
        restaurant
        <br />
        bakery
        <br />
        cafe
        </div>
        <hr />
        <div value = {['shopping', ['clothing_store', 'shopping_mall']]} onClick={() => {this.clickHandler()}}>
        clothing_store
        <br />
        shopping_mall
        </div>
        <hr />
        <div value = {['camping', ['campground']]} onClick={() => {this.clickHandler()}}>campground</div>
        <hr />
        <div value = {['movies_bowling_amusement', ['movie_theater', 'bowling_alley', 'amusement_park', 'park', 'zoo']]} onClick={() => {this.clickHandler()}}>
        movie_theater
        <br />
        bowling_alley
        <br />
        amusement_park
        <br />
        park
        <br />
        zoo
        </div >
        <hr />
        <div value = {['stadiums', ['stadium']]} onClick={() => {this.clickHandler()}}>stadium</div>
        <hr />
        <div value = {['grocery', ['supermarket', 'liquor_store']]} onClick={() => {this.clickHandler()}}>
          supermarket
          <br />
          liquor_store
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tripState: state.tripReducer
  }),
  dispatch => ({
    actions: bindActionCreators(discoverActions, dispatch)
  })
)(Discovery);
