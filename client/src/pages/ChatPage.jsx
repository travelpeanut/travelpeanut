import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fbDb } from '../../../firebase/firebase';
import Message from '../components/Message.jsx';
import * as tripActions from '../actions/tripActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      tripId: null,
      userId: null,
      email: '',
      firstName: '',
      lastName: '',
      imgUrl: '',
    };
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props.userState;
    const { currentTrip } = this.props.tripState;
    this.setState({
      tripId: currentTrip.trip_id,
      userId: currentUser.id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      imgUrl: currentUser.imgUrl,
    }, () => {
      this.getMessages();
    });
  }

  getMessages() {
    fbDb.child(`${this.state.tripId}/messages`)
      .on('value', (snapshot) => {
      // Get the data back from firebase
        let message = snapshot.val();

        // convert the data to an array with the unique key and message data
        message = Object.keys(message).map(key => [key, message[key]]);

        this.setState({
          messages: message,
        });
      });
  }
  handleMessageInput(event) {
    const message = event.target.value;
    this.setState({
      message,
    });
  }

  handleSubmitMessage() {
    const message = {
      message: this.state.message,
      user_id: this.state.userId,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      imgUrl: this.state.imgUrl,
    };
    // Add the new message to firebase
    fbDb.child(`${this.state.tripId}/messages`).push(message);
  }


  render() {
    return (
      <div>
        <div>
          {this.state.messages.map((item) => {
            const key = item[0];
            const msg = item[1].message;
            const { firstName, lastName } = item[1];
            return (
              <Message
                key={key}
                message={msg}
                firstName={firstName}
                lastName={lastName}
                imgUrl={this.state.imgUrl}/>
            );
          })}
        </div>

        <input type="text" onChange={this.handleMessageInput}/>
        <button onClick={this.handleSubmitMessage}>Send Message</button>

      </div>
    );
  }
}

export default connect(
  state => ({
    userState: state.userReducer,
    tripState: state.tripReducer,
  }),
  dispatch => ({
    actions: bindActionCreators(tripActions, dispatch),
  }),
)(Chat);
