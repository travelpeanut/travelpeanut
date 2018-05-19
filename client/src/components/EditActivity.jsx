import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '../styles/img/peanut.png'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment';
import _ from 'underscore';

class EditActivity extends React.Component{
  constructor(props) {
    super(props)
    this.updateActivity = this.updateActivity.bind(this)
    this.editActivity = this.editActivity.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateTime = this.updateTime.bind(this)
    this.updateAMPM = this.updateAMPM.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.state = {
      selectValue: '',
      newName: unescape(this.props.activity.description),
      newAMPM: moment(this.props.activity.start_time, 'hh:mm:ss').format('A'),
      newTime: moment(this.props.activity.start_time, 'hh:mm:ss').format('h:mm')
    }
  }
  
  updateActivity(){
    tripActions.updateActivity(activityInfo)
  }

  deleteActivity(){
    const deleteObj = {
      id: this.props.activity.id,
      dateOfActivity: this.props.activity.date_of_activity,
      tripId: this.props.activity.trip_id
    }
    this.props.actions.deleteActivity(deleteObj)
  }

  editActivity(activityDetails){
    const { activity_level, comment_id, date_of_activity, down_vote, id, trip_id, type, up_vote } = activityDetails;
    const newActivityName = this.state.newName
    let startTime = this.state.newTime
    const newAMPM = this.state.newAMPM
    startTime = startTime.concat(' '+newAMPM);
    var newData = {
      id,
      startTime,
      newActivityName,
      dateOfActivity: date_of_activity,
      tripId: trip_id,
    } 
    this.props.actions.updateActivity(newData)
    this.props.toggleEdit()
  }

  cancelEdit(){
    this.props.toggleEdit()
  }

  updateName(e) {
    this.setState({
      newName: e.target.value
    })
  }

  updateTime(e){
    this.setState({
      newTime: e.target.value
    })
  }

  updateAMPM(e){
    this.setState({
      newAMPM: e.target.value
    })
  }

  render(){
    const { activity_level, comment_id, date_of_activity, description, down_vote, id, start_time, trip_id, type, up_vote } = this.props.activity
    const selectedTime = moment(start_time, 'hh:mm:ss').format('h:mm')
    const selectedAMPM = moment(start_time, 'hh:mm:ss').format('A')
    return(
      <div>
        <div>New Activity: 
          <input id="changeActivityName" value={this.state.newName} onChange={this.updateName} />
        </div>
        <div>New Time:
        <select value={this.state.optionValue} onChange={this.updateTime} id="changeTime">
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
                <select id="newAMPM" onChange={this.updateAMPM}>
                <option value={selectedAMPM}>{selectedAMPM}</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
                <button onClick={() => {this.editActivity({activity_level, comment_id, date_of_activity, down_vote, id, trip_id, type, up_vote})}}>save</button>
                <button onClick={this.cancelEdit}>cancel</button>
                <button onClick={this.deleteActivity} >delete</button>
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