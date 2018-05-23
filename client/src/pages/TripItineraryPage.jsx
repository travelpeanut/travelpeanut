import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import * as chatActions from '../actions/chatActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'
import TripDay from './TripDay.jsx'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showChat: false

    }
    this.toggleChat = this.toggleChat.bind(this)
    this.exportItinerary = this.exportItinerary.bind(this)
  }

  exportItinerary() {
    this.props.actions.exportItinerary(localStorage.getItem('accessToken'))
  }

  componentDidMount() {
    this.props.actions.getMessages()
  }

  toggleChat() {
    this.setState({
      showChat: !this.state.showChat
    })
  }

  render() {
    const currentTrip = this.props.tripState.currentTrip
    // Finding the number of days the trip lasts. Adding +1 to account for the start day of the trip
    const tripDuration = moment(currentTrip.end_date).diff(moment(currentTrip.start_date), 'days') + 1    
    let tripDurationArr = [];
    for (let i = 1; i <= tripDuration; i++) {
      tripDurationArr.push(i)
    }    
    return(
      <div>
        <h1>TRIP: {currentTrip.title}</h1>
        {tripDurationArr.map((day, i) => {
          return (
            <TripDay
              {...this.props}
              startDate={currentTrip.start_date}
              endDate={currentTrip.end_date}
              key={i}
              day={day}
            />
          )
        })}
        <div>
          {this.state.showChat
            ? <Chat showChat={this.state.showChat} toggleChat={this.toggleChat}/>
            : <span className="chat chat-btn" onClick={this.toggleChat}>+</span>      
          }
       </div>

      <button onClick={this.exportItinerary}>
        Export Itinerary To Google Calendar
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
