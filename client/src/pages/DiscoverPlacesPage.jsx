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
    const {city, country} = this.props.tripState.currentTrip
    const tripLocation = city.concat(' ', country)    
    this.props.actions.getNearbyPlacesByType(placeTypes, tripLocation)
  }

  redirectDiscover(type){
    let tripName = window.location.pathname.split('/')[2];
    switch(type){
      case type:
        this.props.history.push(`/trip/${tripName}/discovery/${type}`)
        break      
    }
  }

  render() {
    return (
       <div className="discover">

        <div className="discover-categories">

          <div className="discover-categories-category"onClick={() => {this.clickHandler('restaurants')}}>
            <div className="category">food</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dd8da96be0724ab84e4147d428f6bba&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('cafes')}}>
            <div className="category">cafes</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be7af92635ae8a25f83c7cd27f91a701&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('grocery')}}>
            <div className="category">the essentials</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-0.3.5&s=47a504a636bd9a4b93ee74e4d5b3af38&auto=format&fit=crop&w=500&q=60"/>
          </div>    

          <div className="discover-categories-category"onClick={() => {this.clickHandler('museums')}}>
            <div className="category">arts & culture</div>
            <img className="discover-image"src="https://images.unsplash.com/photo-1499426600726-a950358acf16?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e874ae6e4f2d0b02ea7262e98c35fac3&auto=format&fit=crop&w=500&q=60"/>
          </div> 

          <div className="discover-categories-category"onClick={() => {this.clickHandler('tourist attractions')}}>
            <div className="category">attractions</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1477764860103-e89ce64205a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=899e90226670877eaf63c3c5d923e9be&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('parks')}}>
            <div className="category">the great outdoors</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1503449957946-d06ac01cf711?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ceb158772daeddf8db680178614e34d7&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('spas')}}>
            <div className="category">r&r</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=871a02b242b32565bf5ca078f370ef13&auto=format&fit=crop&w=500&q=60"/>
          </div>   

          <div className="discover-categories-category"onClick={() => {this.clickHandler('nightlife')}}>
            <div className="category">a good night out</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be465b88fdf21a6e05ab522458452344&auto=format&fit=crop&w=500&q=60"/>
          
          </div>   
          <div className="discover-categories-category"onClick={() => {this.clickHandler('shopping')}}>
            <div className="category">shopping</div>
            <img className="discover-image" src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1f7f71a25e279f4149d880e454715bc9&auto=format&fit=crop&w=500&q=60"/>
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

