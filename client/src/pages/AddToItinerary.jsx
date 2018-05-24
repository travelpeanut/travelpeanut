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
        await this.props.actions.addActivityToItinerary(activityData)                
        const activityDateFixed = moment(activityDate, 'MMMM D YYYY').format('YYYY-MM-DD')                
        const day = moment(activityDateFixed).diff(moment(currentTrip.start_date.slice(0,10)),'days') + 1
        // this.props.history.push(`/trip/${tripId}/details/${day}`)        
    }

    getActivities(){
        this.props.actions.getActivitiesForDate(this.date.value)
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
            // let m = moment(day).month()+1
            // let year = moment(day).year()
            dayArr.push([i, date, name, dateValue]);
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
                    {dayArr.map((info, key) => {
                        return (
                            <option key={info[0]} value={info[3]}>Day {info[0]+1}, {info[2]}, {info[1]}</option>
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
                <button onClick={() => this.addActivity(tripState.placeToAdd.name, tripState.currentTrip)}>Add!</button>
                <div> Simple Preview </div>
                <PreviewItinerary activities={this.props.tripState.activitiesForThisDate} />
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