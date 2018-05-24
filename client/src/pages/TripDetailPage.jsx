import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js'
import EditActivity from '../components/EditActivity.jsx';

import moment from 'moment';
import ActivityView from '../components/ActivityView.jsx';
import Comments from '../components/Comments.jsx';

class TripDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addActivityView: false,
      showEdit: false,
      editActivityKey: null, 
    }
    this.showEdit = this.showEdit.bind(this)
    this.getActivities = this.getActivities.bind(this)
    this.addActivity = this.addActivity.bind(this)
  }

  componentDidMount() {
    this.getActivities()    
  }  
  
  componentWillUnmount() {        
    this.props.actions.clearActivities()    
  }

  showEdit(index){
    let editKey = this.state.editActivityKey    
    if (index === editKey){
      editKey = null;      
    } else {
      editKey = index      
    }
    this.setState({
      editActivityKey: editKey
    })
  }

  addActivity(){    
    const activityDate = moment(this.props.location.dateOfDayOfWeek,'MMM Do YYYY').format('YYYY-MM-DD')
    const startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')

    const activityData = {
      activityName: this.activity.value,
      startTime: startTime,
      activityDate: activityDate
    }
    this.props.actions.addActivityToItinerary(activityData)
  }

  getActivities() {
    const date = moment(this.props.location.dateOfDayOfWeek, 'MMM Do YYYY').format('YYYY-MM-DD')    
    this.props.actions.getActivitiesForDate(date)
  }

  render() {
    const tripStartDate = this.props.tripState.currentTrip.start_date
    const start = moment(tripStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm a')    
    const time = [];
    // for (let i = 0; i < 96; i++) {
    //   time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm a'))
    // }
    for (let i = 0; i < 48; i++) {
      time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm'))
    }

    const activities = this.props.tripState.activitiesForThisDate
    return(
      <div>
        <h1>trip details for day: {this.props.location.day}</h1>
        <div>
          <input type="text" placeholder='activity name' ref={(activity) => this.activity = activity}/>
          <button onClick={this.addActivity}>add</button>
          <h4>time</h4>
          <select id="time" ref={(time) => this.time = time}>
            {time.map((el, i) => {
              return <option key={i}>{el}</option>
            })}
          </select>
          <select id="ampm" ref={(ampm) => this.ampm = ampm}>
            <option>AM</option>
            <option>PM</option>
          </select>
          {activities.map((activity, i) => {
            return (
              <div key={i}>
                <hr/>
                  <ActivityView activity={activity}/>
                <hr/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
      tripState: state.tripReducer,
      userState: state.userReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions, discoverActions) , dispatch)
  })
)(TripDetail);