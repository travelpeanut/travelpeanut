import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import * as chatActions from '../actions/chatActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showChat: false
    }
    this.redirectToDetails = this.redirectToDetails.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
    this.exportItinerary = this.exportItinerary.bind(this)
  }

  exportItinerary() {
    this.props.actions.exportItinerary(localStorage.getItem('accessToken'))
  }

  componentDidMount() {
    this.props.actions.getMessages()
  }

  async redirectToDetails(date, dayNumber){
    let {currentTrip} = this.props.tripState
    let tripId = this.props.tripState.currentTrip.trip_id
    await this.props.actions.getActivitiesForDate(date, tripId)
    await this.props.history.push(`/trip/${tripId}/details/${dayNumber}`)
    // setTimeout(() => this.props.history.push(`/trip/${tripId}/details/${dayNumber}`), 500)
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
    for(var dayNumber = 1; dayNumber <= dayCount+1; dayNumber++){
      let day = moment(start).add(24*(dayNumber-1),'hours');
      let date = moment(day).date()
      let month = moment(day).month()+1
      let year = moment(day).year()
      let dayOfWeek = moment(day).format('dddd')
      let fullDate = moment(day).format('MMMM D YYYY')
      dayArr.push({dayNumber, month, date, year, dayOfWeek, fullDate})
    }
    return(
      <div>
       <h1>This is Trip: {currentTrip.title}</h1>

      {
        dayArr.map((item, dayNumber) => {
          return(
            <div key={dayNumber}>
              <p>{item.dayOfWeek} - Day {item.dayNumber + 1} </p>
              <p>{item.month}/{item.date}/{item.year} </p>
              <button onClick={() => this.redirectToDetails(item.fullDate, dayNumber)}>View Details</button>
            </div>
          )
        })
      }
      <div>
        {this.state.showChat
        ? <Chat showChat={this.state.showChat} toggleChat={this.toggleChat}/>
        : <span className="chat chat-btn" onClick={this.toggleChat}>+</span>      
        }
      </div>
      <button onClick={this.exportItinerary}
      >Export Itinerary To Google Calendar
      </button>
      </div>
    )
  }
}


export default connect(
  state => ({
      tripState: state.tripReducer,
  }),
  dispatch => ({
      actions: bindActionCreators( Object.assign({}, tripActions, chatActions) , dispatch)
  })
)(TripItinerary);
