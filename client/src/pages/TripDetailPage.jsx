import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';
import moment from 'moment';

class TripDetail extends React.Component {
  constructor(props) {
    super(props)
    this.toggleAddView = this.toggleAddView.bind(this)
    this.state = {
      addActivityView: false
    }
  }
  
  toggleAddView(){
    let changeView = !this.state.addActivityView;
    this.setState({
      addActivityView: changeView 
    })
  }
  


  render() {
    let dayNumber = parseInt(window.location.pathname.split( '/' )[4]);
    let {currentTrip} = this.props.tripState
    let activitiesForThisDate = this.props.tripState.activitiesForThisDate
    activitiesForThisDate = activitiesForThisDate.sort((a,b) => {
      let aHour = a.start_time.split(':')[0]
      let aMinute = a.start_time.split(':')[1]
      let bHour = b.start_time.split(':')[0]
      let bMinute = b.start_time.split(':')[1]
      if (aHour === bHour){
        return aMinute-bMinute
      } else {
        return aHour - bHour
      }
    })
    if (this.state.addActivityView === false){
      return (
        <div>
          <h1>Trip Details: Day {dayNumber+1} in {currentTrip.title}</h1>
          {activitiesForThisDate.map((activity, key) => {
            return (
              <div key={activity.id}>
                <p>{moment(activity.start_time, 'HH:mm:ss').format('h:mm a')}</p>
                <div>{unescape(activity.description)}</div>
                <hr />
              </div>
            )
          })}
          <button id="addActivity" onClick={this.toggleAddView}>Add Activity</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Trip Details: Day {dayNumber+1} in {currentTrip.title}</h1>
          {activitiesForThisDate.map((activity, key) => {
            return (
              <div key={activity.id}>
                <p>{moment(activity.start_time, 'HH:mm:ss').format('h:mm a')}</p>
                <div>{unescape(activity.description)}</div>
                <hr />
              </div>
            )
          })}
          <button id="addActivity" onClick={this.toggleAddView}>Add Activity</button>
          <div>This should appear after clicking button </div>
        </div>
      )
    }
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
