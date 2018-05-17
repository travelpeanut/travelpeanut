import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '../styles/img/peanut.png'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment';

class EditActivity extends React.Component{
  constructor(props) {
    super(props)
    this.updateActivity = this.updateActivity.bind(this)
    this.handleClick = this.handleClick.bind(this)
    // this.changeText = this.changeText.bind(this)
  }
  
  updateActivity(){
    tripActions.updateActivity(activityInfo)
  }

  handleClick(){
    this.updateActivity()
  }

  addActivity(activityDetails){
    const { activity_level, comment_id, date_of_activity, down_vote, id, trip_id, type, up_vote } = activityDetails
    let startTime = document.getElementById('time').options[time.selectedIndex].value;
    let ampm = document.getElementById('AMPM')
    ampm = ampm.options[ampm.selectedIndex].value
    startTime = startTime.concat(' '+ampm);
    const activityData = Object.assign(activityDetails, {})
    this.props.actions.addActivityToItinerary(activityData)
}

  // changeText(){
  //   let x = document.getElementById("activityName")
  //   var defaultVal = x.defaultValue;
  //   var currentVal = x.value;
  //   if (defaultVal == currentVal){

  //   }
  // }

  render(){
    const { activity_level, comment_id, date_of_activity, description, down_vote, id, start_time, trip_id, type, up_vote } = this.props.activity
    const selectedTime = moment(start_time, 'hh:mm:ss').format('h:mm')
    const selectedAMPM = moment(start_time, 'hh:mm:ss').format('A')
    return(
      <div>
        <div>New Activity: 
          <input id="activityName" defaultValue={description} ref={activityName => this.activityName = activityName} />
        </div>
        <div>New Time:
        <select id="time">
          <option value={selectedTime}>{selectedTime}</option>
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
                <option value={selectedAMPM}>{selectedAMPM}</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
                <button onClick={() => {updateActivity({activity_level, comment_id, date_of_activity, down_vote, id, trip_id, type, up_vote})}}>save</button>
                <button>cancel</button>
                {console.log('heres the activity youre trying to edit:', this.props.activity)}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userState: state.userReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions), dispatch)
  })
)(EditActivity);