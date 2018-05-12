import React from 'react';
import axios from 'axios';
import { firebase, fbDb } from '../../../firebase/firebase';
import Message from '../components/Message.jsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: '',
      tripId: null,
      userId: null,
      email: '',
      firstName: '',
      lastName: '',
      imgUrl: ''      
    }
  this.handleMessageInput = this.handleMessageInput.bind(this);
  this.handleSubmitMessage = this.handleSubmitMessage.bind(this);    
  this.getMessages = this.getMessages.bind(this);    
  }

  componentWillMount() {
    let { currentUser } = this.props.userState
    let { currentTrip } = this.props.tripState
    console.log('currentUser: ', currentUser)
    console.log('currentTrip: ', currentTrip)
    this.setState({
      tripId: currentTrip.trip_id,
      userId: currentUser.id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      imgUrl: currentUser.imgUrl  
    }, () => {
      this.getMessages();
    })
  }

  getMessages() {
    fbDb.child(`${this.state.tripId}/messages`)
    .on('value', (snapshot) => {      
  
      // Get the data back from firebase
      let message = snapshot.val();      
  
      //convert the data to an array with the unique key and message data
      message = Object.keys(message).map((key)=>{
        return [key, message[key]]
      })    
        
      this.setState({
        messages: message
      })      
    })    
  }
  handleMessageInput(event) {
   let message = event.target.value;   
   this.setState({
     message: message,     
   })
  }

  handleSubmitMessage() {
    const message = {
      message: this.state.message,      
      user_id: this.state.userId,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      imgUrl: this.state.imgUrl      
    }
    // Add the new message to firebase
    fbDb.child(`${this.state.tripId}/messages`).push(message)    
  }


  render() {    
    return (
      <div>
        <div>
          {this.state.messages.map((item, i) => {
            const key = item[0]
            const msg = item[1].message
            return (
              <Message key={key} message={msg} firstName={this.state.firstName} imgUrl={this.state.imgUrl}/>
            )
          })}
        </div>

        <input type="text" onChange={this.handleMessageInput}/>
        <button onClick={this.handleSubmitMessage}>Send Message</button>

      </div>
    )
  }
}

export default connect(
  state => ({
    userState: state.userReducer,
    tripState: state.tripReducer
  }),
  dispatch => ({
    actions: bindActionCreators(tripActions, dispatch)
  })
)(Chat)