import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class TripDetail extends React.Component {
  constructor(props) {
    super(props)
    this.getActivitiesForDate = this.getActivitiesForDate.bind(this)
  }

getActivities(){
  //date = date clicked. 
  //trip = trip in state
  let tripId = this.props.tripState.currentTrip.id
  let activityDate = 
  this.props.actions.getActivitiesForDate(date, tripId)
}
 
//grab curr
  
  render() {
    let {currentTrip} = this.props.tripState

    return(
      <div>
        <h1>Trip Details: Day 1 in {currentTrip.title}</h1>

        <p>8am: blah..</p>
       
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
)(TripDetail);
