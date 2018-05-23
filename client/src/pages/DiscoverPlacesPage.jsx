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
    let addressString = this.props.tripState.currentTrip.city + ',' + this.props.tripState.currentTrip.country;
    this.props.actions.getCoordinatesByCity(addressString)
  }
  
  clickHandler(placeType){
    Promise.resolve(
      this.getPlaces(placeType)
    )
    .then(() => 
      setTimeout(() => {this.redirectDiscover(placeType)}, 500)
    )
  }

  getPlaces(placeTypes){
    console.log('searching for placesTypes: ', placeTypes)
    const {city, country} = this.props.tripState.currentTrip
    const tripLocation = city.concat(' ', country)
    console.log('trip location: ', tripLocation)
    this.props.actions.getNearbyPlacesByType(placeTypes, tripLocation)
  }

  getPlacesreviews() {
    
  }

  redirectDiscover(type){
    let tripName = window.location.pathname.split('/')[2];
    switch(type){
      case type:
        this.props.history.push(`/trip/${tripName}/discovery/${type}`)
        break
      // case 'bars_clubs':
      //   this.props.history.push(`/trip/${tripName}/discovery/bars_clubs`)
      //   break
      // case 'spa_salon':
      //   this.props.history.push(`/trip/${tripName}/discovery/spa_salon`)
      //   break
      // case 'food_drink':
      //   this.props.history.push(`/trip/${tripName}/discovery/food_drink`)
      //   break
      // case 'shopping':
      //   this.props.history.push(`/trip/${tripName}/discovery/shopping`)
      //   break
      // case 'camping':
      //   this.props.history.push(`/trip/${tripName}/discovery/camping`)
      //   break
      // case 'movies_bowling_amusement':
      //   this.props.history.push(`/trip/${tripName}/discovery/movies_bowling_amusement`)
      //   break
      // case 'stadiums':
      //   this.props.history.push(`/trip/${tripName}/discovery/stadiums`)
      //   break
      // case 'grocery':
      //   this.props.history.push(`/trip/${tripName}/discovery/grocery`)
      //   break
    }
  }

  render() {
    return (
       <div className="discover">
        <h1>Discover Places</h1>

        <div className="discover-categories">

          <div className="discover-categories-category"onClick={() => {this.clickHandler('museums')}}>
            <div className="category">arts & culture</div>
            <img className="discover-image"src="https://images.unsplash.com/photo-1499426600726-a950358acf16?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e874ae6e4f2d0b02ea7262e98c35fac3&auto=format&fit=crop&w=500&q=60"/>
          </div> 

          <div className="discover-categories-category"onClick={() => {this.clickHandler('nightlife')}}>
            <div className="category">a good night out</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be465b88fdf21a6e05ab522458452344&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('spas')}}>
            <div className="category">r&r</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=871a02b242b32565bf5ca078f370ef13&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('restaurants')}}>
            <div className="category">food</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=02aef228d5a26e0bb9e284b7a604f61b&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('shopping')}}>
            <div className="category">shopping</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7834d8f490640ffe7e7f251227679b3d&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('parks')}}>
            <div className="category">the great outdoors</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61558dee600463841f0a9f6692c11767&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('movietheaters')}}>
            <div className="category">family</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1501256504904-1fbe305bb538?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b765ff3866bb2594a208a58933a996d&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('stadiumsarenas')}}>
            <div className="category">stadiums</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1504016798967-59a258e9386d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e57ccfa6c68c13751c23418ba60a80b&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('grocery')}}>
            <div className="category">the essentials</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bb9584870d1a92db5edfa01edfa4eae6&auto=format&fit=crop&w=500&q=60"/>
          </div>          

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

{/* <div className="discover">
  <h1>Discover Places</h1>

  <div className="discover-categories">

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['museums', ['aquarium', 'art_gallery', 'museum', 'library']])}}>
      <div className="category">arts & culture</div>
      <img className="discover-image"src="https://images.unsplash.com/photo-1499426600726-a950358acf16?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e874ae6e4f2d0b02ea7262e98c35fac3&auto=format&fit=crop&w=500&q=60"/>
    </div> 

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['bars_clubs', ['night_club', 'bar']])}}>
      <div className="category">a good night out</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be465b88fdf21a6e05ab522458452344&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['spa_salon', ['beauty_salon', 'spa']])}}>
      <div className="category">r&r</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=871a02b242b32565bf5ca078f370ef13&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['food_drink', ['restaurant', 'bakery', 'cafe']])}}>
      <div className="category">food</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=02aef228d5a26e0bb9e284b7a604f61b&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['shopping', ['clothing_store', 'shopping_mall']])}}>
      <div className="category">shopping</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7834d8f490640ffe7e7f251227679b3d&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['camping', ['campground']])}}>
      <div className="category">the great outdoors</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61558dee600463841f0a9f6692c11767&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['movies_bowling_amusement', ['movie_theater', 'bowling_alley', 'amusement_park', 'park', 'zoo']])}}>
      <div className="category">family</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1501256504904-1fbe305bb538?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b765ff3866bb2594a208a58933a996d&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['stadiums', ['stadium']])}}>
      <div className="category">stadiums</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1504016798967-59a258e9386d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e57ccfa6c68c13751c23418ba60a80b&auto=format&fit=crop&w=500&q=60"/>
    </div>   

    <div className="discover-categories-category"onClick={() => {this.clickHandler(['grocery', ['supermarket', 'liquor_store']])}}>
      <div className="category">the essentials</div>
      <img className="discover-image" src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bb9584870d1a92db5edfa01edfa4eae6&auto=format&fit=crop&w=500&q=60"/>
    </div>          

  </div>

</div> */}