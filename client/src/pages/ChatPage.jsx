import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Infinite from 'react-infinite';
import Message from '../components/Message.jsx';
import * as tripActions from '../actions/tripActions';
import * as chatActions from '../actions/chatActions';
import './styles.css'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  componentWillMount() {
    this.props.actions.getMessages();
  }

  handleSubmitMessage() {
    const message = this.message.value;
    this.props.actions.sendMessage(message);
    this.message.value = '';
  }

  render() {
    return (
      <div className="chat-box">        

        <Infinite containerHeight={300} elementHeight={1} displayBottomUpwards >
          {this.props.chatState.messages.map((item) => {
            const key = item[0];
            const { firstName, lastName, imgUrl, message } = item[1];
            return (              
                <Message 
                  key={key}
                  message={message}
                  firstName={firstName}
                  lastName={lastName}
                  imgUrl={imgUrl}/>              
            );
          })}
        </Infinite>

        <div>
          <input type="text" placeholder="enter message" ref={(message) => { this.message = message; }}/>
          <button className="msg-btn" onClick={this.handleSubmitMessage}>Send Message</button>
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
