import React from 'react';
import axios from 'axios';
import { firebase, fbDb } from '../../../firebase/firebase';
import Message from '../components/Message.jsx'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: '',
      tripId: 1,
      userId: 1,      
    }
  this.handleMessageInput = this.handleMessageInput.bind(this);
  this.handleSubmitMessage = this.handleSubmitMessage.bind(this);    
  this.getMessages = this.getMessages.bind(this);    
  }

  componentWillMount() {
    this.getMessages();
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
  
      console.log('messages: ', message);
  
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
              <Message key={key} message={msg}/>
            )
          })}
        </div>

        <input type="text" onChange={this.handleMessageInput}/>
        <button onClick={this.handleSubmitMessage}>Send Message</button>

      </div>
    )
  }
}

export default Chat;