import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as discoverActions from '../actions/discoveryActions.js'
import * as tripActions from '../actions/tripActions.js'
import axios from 'axios';
import moment from 'moment';
import PreviewItinerary from '../components/PreviewItinerary.jsx';

class AddToItinerary extends React.Component{
    constructor(props){
        super(props)        
        this.addActivity = this.addActivity.bind(this)
        this.getActivities = this.getActivities.bind(this)
    }

    componentDidMount(){
        this.getActivities()
    }

    addActivity(activityName){        
        let activityDate = moment(this.date.value).format('YYYY-MM-DD')
        let startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
        this.props.actions.addActivityToItinerary(activityName, activityDate, startTime)                
    }

    getActivities(){
        this.props.actions.getActivitiesForDate(moment(this.date.value).format('YYYY-MM-DD'))
    }

    render(){
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
        return(
            <div>
                <h3>Add To Itinerary: {tripState.placeToAdd.name}</h3>
                <h4>Day:</h4>
                <select id="date" onChange={this.getActivities} ref={(date) => this.date = date}>
                    {tripDurationArr.map((date, i) => {
                        const activityDate = moment(currentTrip.start_date).add(i, 'days').format('YYYY-MM-DD')
                        return (
                            <option key={i} value={activityDate}>Day {date[0]}, {moment(activityDate).format('dddd')}, {moment(activityDate).format('MMMM Do YYYY')}</option>
                        )
                    })}
                </select>
                <h4>Time:</h4>
                <select id="time" ref={(time) => this.time = time}>
                    {time.map((el, i) => {
                    return <option key={i}>{el}</option>
                    })}
                </select>
                <select id="ampm" ref={(ampm) => this.ampm = ampm}>
                    <option>AM</option>
                    <option>PM</option>
                </select>
                <button onClick={() => this.addActivity(tripState.placeToAdd.name)}>Add!</button>
                <div> Simple Preview </div>
                <PreviewItinerary/>
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