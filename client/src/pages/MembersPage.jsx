import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions';
import Member from '../components/Member.jsx';

class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.sendInvite = this.sendInvite.bind(this);
    this.deleteTripMember = this.deleteTripMember.bind(this);
    this.deleteInvite = this.deleteInvite.bind(this);
  }

  componentDidMount() {
    this.props.actions.getPendingInvites();
    this.props.actions.getTripMembers();
  }

  sendInvite(toEmail) {
    this.props.actions.sendInvite(toEmail);
    this.toEmail.value = '';
  }

  deleteInvite(email) {
    this.props.actions.deleteInvite(email);
  }

  deleteTripMember(memberId) {
    this.props.actions.deleteTripMember(memberId);
  }

  render() {
    const { currentTrip, pendingInvites, tripMembers } = this.props.tripState;
    const { currentUser } = this.props.userState;

    return (
      <div>
        <h1>View/Edit Members Page for {currentTrip.title}</h1>
        <br/><br/>
        <h3>Owner: {currentUser.first_name}</h3>
        <br/><br/>
        <h3>Pending invites</h3>
        <ul>
          {pendingInvites.map((invite, index) => (
              <div key = {index}>
                <Member
                member = {invite.user_email}
                />
                <button
                onClick={() => this.deleteInvite(invite.user_email)}
                >DELETE INVITATION</button>
              </div>
            ))}
        </ul>
        <br/><br/>

        {currentTrip.owner_id === currentUser.id && (<div>
        <h3>Add a member with email</h3>
        <input type='email' placeholder='email' ref={(toEmail) => { this.toEmail = toEmail; }} />
        <button onClick={() => this.sendInvite(this.toEmail.value)}>Send Invite</button>
        </div>)}

        <br/>
        <h3>Member List:</h3>
        <ul>
          {tripMembers.map((member, index) => (
            <div key={index}>
              <Member
              member={member.first_name}
              />
              <button onClick={() => this.deleteTripMember(member.id)}>Delete this member</button>
            </div>
            ))}
        </ul>
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
)(MembersPage);
