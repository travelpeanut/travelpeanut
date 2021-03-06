import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Infinite from 'react-infinite';
// import InfiniteScroll from 'react-infinite-scroller';
import Message from '../components/Message.jsx';
import * as tripActions from '../actions/tripActions';
import * as chatActions from '../actions/chatActions';
import Cross from '../styles/img/cross.png'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }
  
  handleSubmitMessage() {
    let message = this.message.value;
    if (message.length !== 0) {
      this.props.actions.sendMessage(message);
      this.message.value = '';
    } else {
      alert('please enter a chat message!')
    }
  }

  render() {    
    const { city, country, title } = this.props.tripState.currentTrip
    return (
      <div className="chat chat-box">
        <div className="chat-header">
          <span className="chat-title">{`${title} in ${city}`}</span>
          <span className="chat-close" onClick={this.props.toggleChat}>
            <img src={Cross}/>
          </span>
        </div>        

          <div className="msg-container">
            {this.props.chatState.messages.map((item) => {                        
              const key = item[0];
              const { firstName, lastName, imgUrl, message, user_id } = item[1];
              const currentUserId = this.props.userState.currentUser.id
              return (                           
                <Message
                  key={key} 
                  firstName={firstName}
                  message={message}
                  imgUrl={imgUrl}
                  currentUserId={currentUserId}
                  user_id={user_id}
                />                         
              );
            })}
          </div>

        <div className="msg-form">
          <input className="c-input-textarea" type="text" placeholder="enter message" ref={(message) => { this.message = message; }}  
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleSubmitMessage();
              }
            }}/>          
          {/* <button className="msg-btn" onClick={this.handleSubmitMessage}>Send</button>           */}
        </div>

      </div>
    );
  }
}

export default connect(
  state => ({
    userState: state.userReducer,
    tripState: state.tripReducer,
    chatState: state.chatReducer,
  }),
  dispatch => ({
    actions: bindActionCreators(Object.assign({}, tripActions, chatActions), dispatch),
  }),
)(Chat);
