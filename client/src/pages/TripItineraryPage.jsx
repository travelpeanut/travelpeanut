import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import * as chatActions from '../actions/chatActions.js'
import moment from 'moment'
import Chat from './ChatPage.jsx'
import TripDay from './TripDay.jsx'
import Navbar from '../components/Navbar.jsx'
import Calendar from '../styles/img/calendar.png'
import ChatIcon from '../styles/img/chat.png'
import BackBtn from '../components/BackButton.jsx'

class TripItinerary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showChat: false
    }
    this.toggleChat = this.toggleChat.bind(this)
    this.exportItinerary = this.exportItinerary.bind(this)
    this.handleBack = this.handleBack.bind(this)
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

  handleBack(){
    const {currentTrip} = this.props.tripState
    this.props.actions.setCurrentTrip(currentTrip)
  }

  render() {
    const {currentTrip} = this.props.tripState
    // Finding the number of days the trip lasts. Adding +1 to account for the start day of the trip
    const tripDuration = moment(currentTrip.end_date).diff(moment(currentTrip.start_date), 'days') + 1    
    let tripDurationArr = [];
    for (let i = 1; i <= tripDuration; i++) {
      tripDurationArr.push(i)
    }    

    return(
      <div className="tripItinerary">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <p className="home-hero__text">{currentTrip.title}</p>
          <p className="home-hero__textLocation">{currentTrip.city}, {currentTrip.country}</p>
        </div>


        <div className="tripItinerary-container">
          <h2>Trip Itinerary</h2>

          <BackBtn content={"Back to Trip Menu"} handleBack={this.handleBack}/>

          <div className="tripItinerary-container-btnContainer">
            <div className="tripItinerary-container-btnContainer-exportBtn">

              <button className="btn-tran draw-border-orange"  onClick={this.exportItinerary}>              
                <img src={Calendar} /> Sync Itinerary to Google Calendar
              </button>

            </div>
          </div>
           

          <div className="tripItinerary-container-list">
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
          </div>

        </div>


        <div>
          {this.state.showChat
            ? <Chat showChat={this.state.showChat} toggleChat={this.toggleChat}/>
            : <span className="chatIcon chat-btn" onClick={this.toggleChat}>
                <img className="chatIcon-img" src={ChatIcon} />
              </span>      
          }
        </div>

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




//   let {currentTrip} = this.props.tripState
//   let start = new Date(currentTrip.start_date)
//   let end = new Date(currentTrip.end_date)
//   let dayCount = Math.round(Math.abs((end.getTime() - start.getTime())/(24*60*60*1000)))
//   let dayArr = [];
//   for(var dayNumber = 1; dayNumber <= dayCount+1; dayNumber++){
//     let day = moment(start).add(24*(dayNumber-1),'hours');
//     let date = moment(day).date()
//     let month = moment(day).month()+1
//     let year = moment(day).year()
//     let dayOfWeek = moment(day).format('dddd')
//     let fullDate = moment(day).format('MMMM D YYYY')
//     dayArr.push({dayNumber, month, date, year, dayOfWeek, fullDate})
//   }
//   return(
//     <div>
//      <h1>This is Trip: {currentTrip.title}</h1>

//     {
//       dayArr.map((item, dayNumber) => {
//         return(
//           <div key={dayNumber}>
//             <p>{item.dayOfWeek} - Day {item.dayNumber} </p>
//             <p>{item.month}/{item.date}/{item.year} </p>
//             <button onClick={() => this.redirectToDetails(item.fullDate, dayNumber+1)}>View Details</button>
//           </div>
//         )
//       })
//     }
//     <div>
//       {this.state.showChat
//       ? <Chat showChat={this.state.showChat} toggleChat={this.toggleChat}/>
//       : <span className="chat chat-btn" onClick={this.toggleChat}>+</span>      
//       }
//     </div>
//     <button onClick={this.exportItinerary}
//     >Export Itinerary To Google Calendar
//     </button>
//     </div>
//   )
// }