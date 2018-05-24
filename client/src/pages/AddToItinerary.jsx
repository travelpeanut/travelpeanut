import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as discoverActions from '../actions/discoveryActions.js'
import * as tripActions from '../actions/tripActions.js'
import axios from 'axios';
import moment from 'moment';

class AddToItinerary extends React.Component{
    constructor(props){
        super(props)        
        this.addActivity = this.addActivity.bind(this)
    }

    addActivity(activityName, currentTrip){        
        let tripId = currentTrip.trip_id;                
        let activityDate = document.getElementById("date").options[date.selectedIndex].value;
        let startTime = document.getElementById('time').options[time.selectedIndex].value;
        let ampm = document.getElementById('AMPM')
        ampm = ampm.options[ampm.selectedIndex].value        
        startTime = startTime.concat(' '+ampm);        
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

    render(){
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
        return(
            <div>
                <h3>Add To Itinerary: {tripState.placeToAdd.name}</h3>
                <h4>Day:</h4>
                <select id="date">
                    {dayArr.map((info, key) => {
                        return (
                            <option key={info[0]} value={info[3]}>Day {info[0]+1}, {info[2]}, {info[1]}</option>
                        )
                    })}
                </select>
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

                <button onClick={() => this.addActivity(tripState.placeToAdd.name, tripState.currentTrip)}>Add!</button>
                
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
  )(AddToItinerary);