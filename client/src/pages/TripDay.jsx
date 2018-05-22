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
      <div>{dayOfWeek} - Day {this.props.day}

        <div>
          {dateOfDayOfWeek}
        </div>
  
        <button onClick={() => this.redirectToTripDetails(dayOfWeek, dateOfDayOfWeek)}>view details</button>
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