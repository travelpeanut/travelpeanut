import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'
import './styles.css'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showChat: false
    }
    this.redirectToDetails = this.redirectToDetails.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
  }

  redirectToDetails(date){
    let {currentTrip} = this.props.tripState
    let tripId = this.props.tripState.currentTrip.trip_id
    this.props.actions.getActivitiesForDate(date, tripId)
    setTimeout(() => this.props.history.push(`/trip/${tripId}/details`), 500)
  }

  toggleChat() {
    this.setState({
      showChat: !this.state.showChat
    })
  }
  
  render() {
    let {currentTrip} = this.props.tripState
    let start = new Date(currentTrip.start_date)
    let end = new Date(currentTrip.end_date)
    let dayCount = Math.round(Math.abs((end.getTime() - start.getTime())/(24*60*60*1000)))
    let dayArr = [];
    for(var i = 0; i <= dayCount; i++){
      let day = moment(start).add(24*i,'hours');
      let date = moment(day).date()
      let m = moment(day).month()+1
      let year = moment(day).year()
      let name = moment(day).format('dddd')
      let fullDate = moment(day).format('MMMM D YYYY')
      dayArr.push([i, m, date, year, name, fullDate]);
    }

    console.log('showChat: ', this.state.showChat);
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
      {this.state.showChat
        ? <Chat showChat={this.state.showChat} className="chat-box"/>
        : <div></div>
      }
      <button className="chat-btn" onClick={this.toggleChat}>{this.state.showChat ? 'hide chat' : 'show chat'}</button>
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
