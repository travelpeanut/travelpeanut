import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '../styles/img/peanut.png'
import * as tripActions from '../actions/tripActions.js'
import * as discoverActions from '../actions/discoveryActions.js'
import axios from 'axios'
import moment from 'moment'
import PreviewItinerary from '../components/PreviewItinerary.jsx'

class AddFromDiscoverPopup extends React.Component {
  constructor(props) {
    super(props)
    this.closePopup = this.closePopup.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.getActivities = this.getActivities.bind(this)
  }

  componentDidMount(){
    this.getActivities()
  }

  addActivity(activityName){        
    let activityDate = moment(this.date.value).format('YYYY-MM-DD')
    let startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
    this.props.actions.addActivityToItinerary(activityName, startTime, activityDate)                
}

  getActivities(){
      this.props.actions.getActivitiesForDate(moment(this.date.value).format('YYYY-MM-DD'))
  }

  closePopup(){
    this.props.handleClosePopup()
  }

  render() {
    const {tripState} = this.props
    const {currentTrip} = this.props.tripState
    const start = moment(this.props.tripState.currentTrip.start_date, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm a')        
    // Finding the number of days the trip lasts. Adding +1 to account for the start day of the trip
    const tripDuration = moment(currentTrip.end_date).diff(moment(currentTrip.start_date), 'days') + 1    
    const tripDurationArr = [];
    for (let i = 1; i <= tripDuration; i++) {
      tripDurationArr.push([i, currentTrip.start_date])
    }    
    let time = [];
    for (let i = 0; i < 48; i++) {
        time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm'))
    }

    return (
      <div className="c-popup--overlay" style={{'display':`${this.props.show}`}}>
        <div className="c-popup c-discoverPopup">

          <h3>Add to Trip Itinerary: {tripState.placeToAdd.name}</h3>
        


          <div className="discoverPopup">

            <div className="grid">
              <div className="row">
                <div className="col col-2-of-4">

                  <div className="discoverPopup-formContainer">
                    <h4> Select Day:</h4>
                    <select className="c-select c-select-basic" id="date" onChange={this.getActivities} ref={(date) => this.date = date}>
                    {tripDurationArr.map((date, i) => {
                        const activityDate = moment(currentTrip.start_date).add(i, 'days').format('YYYY-MM-DD')
                        return (
                            <option key={i} value={activityDate}>Day {date[0]}, {moment(activityDate).format('dddd')}, {moment(activityDate).format('MMMM Do YYYY')}</option>
                        )
                    })}
                    </select>
                  </div>

                  <div className="discoverPopup-formContainer">
                    <h4>Select Time:</h4>
                    <select className="c-select c-select-time" id="time" ref={(time) => this.time = time}>
                        {time.map((el, i) => {
                        return <option key={i}>{el}</option>
                        })}
                    </select>
                    <select className="c-select c-select-time" id="ampm" ref={(ampm) => this.ampm = ampm}>
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                  </div>

                  <div className="btn-duo-position">
                    <button className="btn-tran btn-tran-small draw-border" onClick={this.closePopup} >Cancel</button>
                    <button className="btn-tran btn-tran-small draw-border-orange" onClick={() => this.addActivity(tripState.placeToAdd.name)} >Add!</button>
                  </div>
                  
                </div>
                <div className="col col-2-of-4">
                  <div className="discoverPopup-formContainer">
                    <h4>{this.date ? this.date.value : ''}: Itinerary Preview</h4>
                    <PreviewItinerary/>
                  </div>
                </div>
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
    userState: state.userReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions, discoverActions), dispatch)
  })
)(AddFromDiscoverPopup);