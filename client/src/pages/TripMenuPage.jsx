import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import Navbar from '../components/Navbar.jsx'


class TripMenu extends React.Component {
  constructor(props) {
    super(props)

    this.redirectItinerary = this.redirectItinerary.bind(this)


  }

  redirectItinerary(type){
    let {user_id} = this.props.tripState.currentTrip
    switch(type){
      case 'itinerary':
        this.props.history.push(`/trip/${user_id}/itinerary`)
        break
      case 'discover':
        this.props.history.push(`/trip/${user_id}/discovery`)
        break
      case 'members':
        this.props.history.push(`/trip/${user_id}/members`)
        break
      default:
        break

    }
  }

 

  
  render() {
    let tripName = window.location.pathname.split( '/' )[2];
    let {currentTrip} = this.props.tripState

    return(
      <div className="tripmenu">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <span className="home-hero__text">{currentTrip.title}</span>
        </div>
        
        <div className="grid tripmenu-grid">
          <h2>Trip Menu</h2>
          <div className="row">
            <div className="col col-1-of-3 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1522205393480-69ac15dafb07?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1cdd41f80a21709d55bc35ec17415275&auto=format&fit=crop&w=1950&q=80" alt=""/>
              </div>
              <div>
                <h3>View/Edit Itinerary</h3>
                <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('itinerary') }}>Go</button>
              </div>
            </div>
            <div className="col col-2-of-3 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1518784095177-ef1da6313126?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0495d4003bad78986118084529737bc0&auto=format&fit=crop&w=1950&q=80" alt=""/>
              </div>
              <div>
                <h3>Discover Places</h3>  
                <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('discover')}}>Go</button>
              </div>
            </div>
            <div className="col col-3-of-3 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1525422847952-7f91db09a364?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce6622924dae3b9be067e1778a6b8707&auto=format&fit=crop&w=1965&q=80" alt=""/>
              </div>
              <div>
                <h3>View/Add Members</h3>  
                <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('members')}}>Go</button>
              </div>

            </div>
          </div>
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
      actions: bindActionCreators( tripActions , dispatch)
  })
)(TripMenu);
