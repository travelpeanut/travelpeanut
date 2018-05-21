import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js'
import EditActivity from '../components/EditActivity.jsx';

import moment from 'moment';
import ActivityView from '../components/ActivityView.jsx';

class TripDetail extends React.Component {
  constructor(props) {
    super(props)
    this.toggleAddView = this.toggleAddView.bind(this)
    this.showEdit = this.showEdit.bind(this)
    this.state = {
      addActivityView: false,
      activityName: '',
      activityType: '',
      activityLevel: '',
      showEdit: false,
      editActivityKey: null
    }
  }
  
  toggleAddView(){
    let changeView = !this.state.addActivityView;
    this.setState({
      addActivityView: changeView 
    })
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

  

  addActivity(activityName, currentTrip){
    let ampm = document.getElementById('AMPM')
    ampm = ampm.options[ampm.selectedIndex].value
    let startTime = document.getElementById('time').options[time.selectedIndex].value;
    startTime = startTime.concat(' '+ampm);

    const userId = this.props.userState.currentUser.id
    const start = new Date(currentTrip.start_date)
    const dayNumber = parseInt(window.location.pathname.split( '/' )[4]);
    let fullDate = moment(start).add(24*(dayNumber-1),'hours').format('MMMM D YYYY');

    const activityData = {
      activityName,
      tripId: currentTrip.trip_id,
      startTime,
      userId,
      // activityType: this.activityType.value,
      activityDate: fullDate,
    }

    this.props.actions.addActivityToItinerary(activityData)
}


  render() {
    let {currentTrip} = this.props.tripState
    let dayNumber = parseInt(window.location.pathname.split( '/' )[4]);    
    let activitiesForThisDate = this.props.tripState.activitiesForThisDate    
    activitiesForThisDate = activitiesForThisDate.sort((a,b) => {
      let aHour = a.start_time.split(':')[0]
      let aMinute = a.start_time.split(':')[1]
      let bHour = b.start_time.split(':')[0]
      let bMinute = b.start_time.split(':')[1]
      if (aHour === bHour && aMinute === bMinute){
        return a.id - b.id
      } else if (aHour === bHour){
        return aMinute - bMinute
      } else {
        return aHour - bHour
      }
    })
    return (
      <div>
        <h1>Trip Details: Day {dayNumber+1} in {currentTrip.title}</h1>
        <input id="activityName" placeholder="Activity Name" ref={activityName => this.activityName = activityName} />
        <h4>Time:</h4>
              <select id="time">
                  <option value="12:00">12:00</option>
                  <option value="12:15">12:15</option>
                  <option value="12:30">12:30</option>
                  <option value="12:45">12:45</option>
                  <option value="1:00">1:00</option>
                  <option value="1:15">1:15</option>
                  <option value="1:30">1:30</option>
                  <option value="1:45">1:45</option>
                  <option value="2:00">2:00</option>
                  <option value="2:15">2:15</option>
                  <option value="2:30">2:30</option>
                  <option value="2:45">2:45</option>
                  <option value="3:00">3:00</option>
                  <option value="3:15">3:15</option>
                  <option value="3:30">3:30</option>
                  <option value="3:45">3:45</option>
                  <option value="4:00">4:00</option>
                  <option value="4:15">4:15</option>
                  <option value="4:30">4:30</option>
                  <option value="4:45">4:45</option>
                  <option value="5:00">5:00</option>
                  <option value="5:15">5:15</option>
                  <option value="5:30">5:30</option>
                  <option value="5:45">5:45</option>
                  <option value="6:00">6:00</option>
                  <option value="6:15">6:15</option>
                  <option value="6:30">6:30</option>
                  <option value="6:45">6:45</option>
                  <option value="7:00">7:00</option>
                  <option value="7:15">7:15</option>
                  <option value="7:30">7:30</option>
                  <option value="7:45">7:45</option>
                  <option value="8:00">8:00</option>
                  <option value="8:15">8:15</option>
                  <option value="8:30">8:30</option>
                  <option value="8:45">8:45</option>
                  <option value="9:00">9:00</option>
                  <option value="9:15">9:15</option>
                  <option value="9:30">9:30</option>
                  <option value="9:45">9:45</option>
                  <option value="10:00">10:00</option>
                  <option value="10:15">10:15</option>
                  <option value="10:30">10:30</option>
                  <option value="10:45">10:45</option>
                  <option value="11:30">11:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:15">11:15</option>
                  <option value="11:45">11:45</option>
              </select>
              <select id="AMPM">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
              </select>

              <button onClick={() => this.addActivity(this.activityName.value, this.props.tripState.currentTrip)}>Add!</button>
        
        <br />
        <hr />
        {activitiesForThisDate.map((activity, index) => {
          console.log('index in activitiesForThisDate: ', index);
          return (
            <div key={activity.id}>
              <ActivityView activity={activity}/>
            </div>
          )
        })}
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
