import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions';
import Member from '../components/Member.jsx';
import Navbar from '../components/Navbar.jsx'
import { Switch, Route } from 'react-router-dom'
import Cross from '../styles/img/cross.png'


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
    console.log('current', pendingInvites)
    const { currentUser } = this.props.userState;

    return (
      <div className="members">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <span className="home-hero__text">{currentTrip.title}</span>
        </div>

        <div className="members-container">
          <h2>Invite/Manage Members</h2>

          <div className="grid">
            <div className="row members-container-inner">

              <div className="col col-2-of-4">
                <h3>Send Invitation</h3>
                <p>Invite your friends to join your trip!</p>
                <input className="c-input-basic" type='email' placeholder='Enter Email' ref={(toEmail) => { this.toEmail = toEmail; }} />
                <br/>
                <button className="btn-tran draw-border" onClick={() => this.sendInvite(this.toEmail.value)}>Send Invite</button>
              
                <br/><br/><br/>
                <h3>Pending Invites:</h3>
                {pendingInvites.map((invite, index) => (
                    <div className="members-container-listItem" key = {index}>
                      <Member
                      member = {invite.user_email}
                      />
                      <img className="members-container-listItem__icon" src={Cross} alt="" onClick={() => this.deleteInvite(invite.user_email)}/>
                    </div>
                ))}
              
              </div>

              <div className="col col-2-of-4">
                <h3>Owner: {currentUser.first_name}</h3>
                <h3>Member List:</h3>

                {tripMembers.map((member, index) => (
                  <div className="members-container-listItem" key={index}>
                    <Member
                    member={member.first_name}
                    />
                    <img className="members-container-listItem__icon" src={Cross} alt="" onClick={() => this.deleteTripMember(member.id)}/>
                  </div>
                ))}





              
              </div>
            
            </div>
          </div>


        </div>
       
  


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
