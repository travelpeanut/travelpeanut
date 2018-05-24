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

  async addActivity(activityName, currentTrip){        
      let tripId = currentTrip.trip_id;        
      let activityDate = this.date.value
      let startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
      let userId = this.props.userState.currentUser.id

      let activityData = {
          tripId,
          userId,
          activityDate,
          startTime,
          activityName
      }

      this.props.actions.addActivityToItinerary(activityData)                
  }

  getActivities(){
      this.props.actions.getActivitiesForDate(this.date.value)
  }


  closePopup(){
    this.props.handleClosePopup()
  }

  render() {
    let {tripState} = this.props
    let start = new Date(tripState.currentTrip.start_date)
    let end = new Date(tripState.currentTrip.end_date)
    let dayCount = Math.round(Math.abs((end.getTime() - start.getTime())/(24*60*60*1000)))
    let dayArr = [];
    for(var i=0; i<=dayCount; i++){
        let day = moment(start).add(24*i,'hours');
        let dateValue = moment(day).format("MMMM D YYYY")
        let date = moment(day).format('MMMM Do YYYY')
        let name = moment(day).format('dddd')
        dayArr.push([i, date, name, dateValue]);
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
                        {dayArr.map((info, key) => {
                            return (
                                <option key={info[0]} value={info[3]}>Day {info[0]+1}, {info[2]}, {info[1]}</option>
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
                    <button className="btn-tran btn-tran-small draw-border-orange" onClick={() => this.addActivity(tripState.placeToAdd.name, tripState.currentTrip)} >Add!</button>
                  </div>
                  
                </div>
                <div className="col col-2-of-4">
                  <div className="discoverPopup-formContainer">
                    <h4>{this.date ? this.date.value : ''}: Itinerary Preview</h4>
                    <PreviewItinerary activities={this.props.tripState.activitiesForThisDate} />
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