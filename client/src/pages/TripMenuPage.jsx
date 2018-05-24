import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import Navbar from '../components/Navbar.jsx'
import BackBtn from '../components/BackButton.jsx'


class TripMenu extends React.Component {
  constructor(props) {
    super(props)
    this.redirectItinerary = this.redirectItinerary.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount() {
    console.log('tripState in TripMenuPage: ', this.props.tripState)
  }

  redirectItinerary(type){    
    let { trip_id } = this.props.tripState.currentTrip
    this.props.history.push(`/trip/${trip_id}/${type}`)
  }

  handleBack(){
    this.props.history.push('/home')
  }

  render() {
    let {currentTrip} = this.props.tripState

    return(
      <div className="tripmenu">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <p className="home-hero__text">{currentTrip.title}</p>
          <p className="home-hero__textLocation">{currentTrip.city}, {currentTrip.country}</p>
        </div>
        
        <div className="grid tripmenu-grid">
          <h2>Trip Menu</h2>
          <BackBtn content={"Back to Home"} handleBack={this.handleBack}/>

          <div className="row">
            <div className="col col-4-of-12 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1522205393480-69ac15dafb07?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1cdd41f80a21709d55bc35ec17415275&auto=format&fit=crop&w=1950&q=80" alt=""/>
              </div>
              <div>
                <h3>View/Edit Itinerary</h3>
                <div className="tripmenu-category__btn">
                  <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('itinerary') }}>Go</button>
                </div>
              </div>
            </div>
            <div className="col col-4-of-12 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1518784095177-ef1da6313126?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0495d4003bad78986118084529737bc0&auto=format&fit=crop&w=1950&q=80" alt=""/>
              </div>
              <div>
                <h3>Discover Places</h3> 
                <div className="tripmenu-category__btn"> 
                  <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('discovery')}}>Go</button>
                </div>
              </div>
            </div>
            <div className="col col-4-of-12 tripmenu-category">
              <div className="tripmenu-category__img">
                <img src="https://images.unsplash.com/photo-1525422847952-7f91db09a364?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce6622924dae3b9be067e1778a6b8707&auto=format&fit=crop&w=1965&q=80" alt=""/>
              </div>
              <div>
                <h3>Invite/Manage Members</h3> 
                <div className="tripmenu-category__btn">
                  <button className="btn-tran draw-border" onClick={() => { this.redirectItinerary('members')}}>Go</button>
                </div> 
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
