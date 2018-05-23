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
    this.cancelEdit = this.cancelEdit.bind(this)
  }
  
  updateActivity(){
    const newStartTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
    this.props.actions.updateActivity(
      this.props.activity.id,
      this.activityName.value,
      this.props.activity.date_of_activity,
      newStartTime)
    this.props.toggleEdit()
  }

  cancelEdit(){
    this.props.toggleEdit()
  }

  render(){
    const tripStartDate = this.props.tripState.currentTrip.start_date
    const start = moment(tripStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm a')    
    const time = [];

    for (let i = 0; i < 48; i++) {
      time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm'))
    }

    return(
      <div>
        <div>New Activity: 
          <input id="activityName" ref={(activityName => this.activityName = activityName)}/>
        </div>
        <div>New Time:
        <select id="time" ref={(time) => this.time = time}>
            {time.map((el, i) => {
              return <option key={i}>{el}</option>
            })}
          </select>
          <select id="ampm" ref={(ampm) => this.ampm = ampm}>
            <option>AM</option>
            <option>PM</option>
          </select>
                <button onClick={this.updateActivity}>save</button>
                <button onClick={this.cancelEdit}>cancel</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userState: state.userReducer,
    tripState: state.tripReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions), dispatch)
  })
)(EditActivity);