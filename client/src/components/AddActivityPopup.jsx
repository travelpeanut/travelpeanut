import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '../styles/img/peanut.png'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment';


class AddActivityPopup extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  handleSubmit(){
    const activityDate = moment(this.props.location.dateOfDayOfWeek,'MMM Do YYYY').format('YYYY-MM-DD')
    const startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
    this.props.actions.addCustomActivity(this.activity.value, startTime, activityDate)
    this.closePopup()
  }

  closePopup(){
    this.props.handleClosePopup()
  }

  render() {
    const {currentTrip} = this.props.tripState
    const tripStartDate = this.props.tripState.currentTrip.start_date
    const start = moment(tripStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm a')    
    const time = [];
    for (let i = 0; i < 48; i++) {
      time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm'))
    }

    return (
      <div className="c-popup--overlay" style={{'display':`${this.props.show}`}}>
        <div className="c-popup">

          <div className="c-addActivityPopup">
            <h3>Add an Activity</h3>
            <input className="c-input-comment" type="text" placeholder='activity name' ref={(activity) => this.activity = activity}/>
            <h5>Select Time</h5>
            <select className="c-select c-select-basic" id="time" ref={(time) => this.time = time}>
              {time.map((el, i) => {
                return <option key={i}>{el}</option>
              })}
            </select>
            <select className="c-select c-select-basic" id="ampm" ref={(ampm) => this.ampm = ampm}>
              <option>AM</option>
              <option>PM</option>
            </select>
            <br/>
            <div className="btn-duo-position">
              <button className="btn-tran btn-tran-small draw-border" onClick={this.closePopup}>Cancel</button>
              <button className="btn-tran btn-tran-small draw-border-orange" onClick={this.handleSubmit}>Save</button>
            </div>
          </div>

        </div>
    </div> 
    )
  }
}


export default connect(
  state => ({
    tripState: state.tripReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions), dispatch)
  })
)(AddActivityPopup);