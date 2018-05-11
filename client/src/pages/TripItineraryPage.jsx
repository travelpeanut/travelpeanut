import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment'
import Chat from './ChatPage'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails(){
    let {currentTrip} = this.props.tripState
    this.props.history.push(`/trip/${currentTrip.id}/details`)
  }


  
  render() {
    let {currentTrip} = this.props.tripState
    let start = new Date(currentTrip.start_date)
    let end = new Date(currentTrip.end_date)
    var dayCount = Math.round(Math.abs((end.getTime() - start.getTime())/(24*60*60*1000))) + 1
    let dayArr = [];
    for(var i=1; i<=dayCount; i++){
      let day = moment(start).day(i-1,'days')._d;
      let date = moment(day).date()
      let m = moment(day).month()+1
      let year = moment(day).year()
      dayArr.push([i, m, date, year]);
    }

    return(
      <div>
       <h1>This is Trip: {currentTrip.title}</h1>

      {
        dayArr.map((item, i) => {
          return(
            <div key={i}>
              <p>day {item[0]} </p>
              <p>{item[1]}/{item[2]}/{item[3]} </p>
              <button onClick={this.redirectToDetails}>View Details</button>
            </div>
          )
        })
      }
      <Chat />
    
       
      </div>
    )
  }



}


export default connect(
  state => ({
      tripState: state.tripReducer,
  }),
  dispatch => ({
      actions: bindActionCreators( tripActions , dispatch)
  })
)(TripItinerary);
