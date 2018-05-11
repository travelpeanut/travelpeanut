import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails(date){
    let {currentTrip} = this.props.tripState
    //
    this.props.history.push(`/trip/${currentTrip.id}/details`)
  }


  
  render() {
    let {currentTrip} = this.props.tripState
    let start = new Date(currentTrip.start_date)
    let end = new Date(currentTrip.end_date)
    console.log('start is...', start);
    console.log('end is...', end);
    var dayCount = Math.round(Math.abs((end.getTime() - start.getTime())/(24*60*60*1000)))
    let dayArr = [];
    for(var i = 0; i <= dayCount; i++){
      let day = moment(start).add(24*i,'hours');
      if (i === 1){
        console.log('first day is...', day)
      }
      let date = moment(day).date()
      let m = moment(day).month()+1
      let year = moment(day).year()
      let name = moment(day).format('dddd')
      let fullDate = moment(day).format('MMMM D YYYY')
      dayArr.push([i, m, date, year, name, fullDate]);
      // console.log('dayArr is...', dayArr)
    }

    return(
      <div>
       <h1>This is Trip: {currentTrip.title}</h1>

      {
        dayArr.map((item, i) => {
          return(
            <div key={i}>
              <p>{item[4]} - Day {item[0]+1} </p>
              <p>{item[1]}/{item[2]}/{item[3]} </p>
              <button onClick={() => this.redirectToDetails(item[5])}>View Details</button>
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
