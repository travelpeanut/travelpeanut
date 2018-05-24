import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import * as chatActions from '../actions/chatActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'

class TripDay extends React.Component {
  constructor() {
    super()
    this.state = {
      activities: []
    }
  this.redirectToTripDetails = this.redirectToTripDetails.bind(this)
  }

  redirectToTripDetails(dayOfWeek, dateOfDayOfWeek){
    let {currentTrip} = this.props.tripState
    let tripId = this.props.tripState.currentTrip.trip_id
    const day = this.props.day
    // this.props.actions.getActivitiesForDate(date, tripId)
    const pathname = `/trip/${tripId}/details/${this.props.day}`
    this.props.history.push({
      pathname,
      dayOfWeek,
      dateOfDayOfWeek,
      day,
    })
    // setTimeout(() => this.props.history.push(`/trip/${tripId}/details/${dayNumber}`), 500)
  }

  render() {
    const dayOfWeek = moment(this.props.startDate).add(this.props.day-1, 'days').format('dddd')
    const dateOfDayOfWeek = moment(this.props.startDate).add(this.props.day-1, 'days').format('MMM Do YYYY')
    return (

      <div className="c-tripHome">
        <div className="grid">
          <div className="row">
            <div className="col col-2-of-4">
              <img src="https://images.unsplash.com/photo-1446038202205-1c96430dbdab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8bc8829ca2d952a157c651e7cb5facc9&auto=format&fit=crop&w=2849&q=80" alt=""/>
            </div>
            <div className="col col-2-of-4">
              <div className="c-tripHome-content">
                <h3>Day {this.props.day}</h3>
                <br/>
                <span className="c-tripHome-location">{dateOfDayOfWeek}</span>
                <p>{dayOfWeek}</p>
                <button className="btn-tran draw-border btn-itinerary"  onClick={() => this.redirectToTripDetails(dayOfWeek, dateOfDayOfWeek)}>View/Edit Details</button>
              
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
      actions: bindActionCreators( Object.assign({}, tripActions, chatActions) , dispatch)
  })
)(TripDay);