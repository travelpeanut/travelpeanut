import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as discoverActions from '../actions/discoveryActions'


class Discovery extends React.Component {
  constructor(props) {
    super(props);
    this.redirectDiscover = this.redirectDiscover.bind(this)
  }

  componentDidMount(){
    let addressString = this.props.tripState.temp.city + ',' + this.props.tripState.temp.country;
    // console.log('stringToUse for address:', addressString)
    this.props.actions.getCoordinatesByCity(addressString)
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
        <div onClick={() => {this.redirectDiscover('museums')}}>
        aquarium
        <br />
        art_gallery
        <br />
        museum
        <br />
        library
        </div>
        <hr />
        <div onClick={() => {this.redirectDiscover('bars_clubs')}}>
        night_club
        <br />
        bar
        </div>
        <hr />
        <div onClick={() => {this.redirectDiscover('spa_salon')}}>
        beauty_salon
        <br />
        spa
        </div>
        <hr />
        <div onClick={() => {this.redirectDiscover('food_drink')}}>
        restaurant
        <br />
        bakery
        <br />
        cafe
        </div>
        <hr />
        <div onClick={() => {this.redirectDiscover('shopping')}}>
        clothing_store
        <br />
        shopping_mall
        </div>
        <hr />
        <div onClick={() => {this.redirectDiscover('camping')}}>campground</div>
        <hr />
        <div onClick={() => {this.redirectDiscover('movies_bowling_amusement')}}>
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
        <div onClick={() => {this.redirectDiscover('stadiums')}}>stadium</div>
        <hr />
        <div onClick={() => {this.redirectDiscover('grocery')}}>
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
