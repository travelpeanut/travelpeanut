import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions';
import Member from '../components/Member.jsx';
import Navbar from '../components/Navbar.jsx'
import { Switch, Route } from 'react-router-dom'
import Cross from '../styles/img/cross.png'
import BackBtn from '../components/BackButton.jsx'


class MembersPage extends React.Component {
  constructor(props) {
    super(props);
    this.sendInvite = this.sendInvite.bind(this)
    this.deleteTripMember = this.deleteTripMember.bind(this)
    this.deleteInvite = this.deleteInvite.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount() {
    this.props.actions.getPendingInvites()
    this.props.actions.getTripMembers()
  }

  sendInvite(toEmail) {
    this.props.actions.sendInvite(toEmail)
    this.toEmail.value = ''
  }

  deleteInvite(email) {
    this.props.actions.deleteInvite(email)
  }

  deleteTripMember(memberId) {
    if (memberId !== this.props.tripState.currentTrip.owner_id) {
      this.props.actions.deleteTripMember(memberId)
    } else {
      alert('please contact the trip owner to delete this member!')
    }
  }

  handleBack(){
    const {currentTrip} = this.props.tripState
    this.props.actions.setCurrentTrip(currentTrip)
  }


  render() {
    const { currentTrip, pendingInvites, tripMembers } = this.props.tripState
    const { currentUser } = this.props.userState

    return (
      <div className="members">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <p className="home-hero__text">{currentTrip.title}</p>
          <p className="home-hero__textLocation">{currentTrip.city}, {currentTrip.country}</p>
        </div>

        <div className="members-container">
          <h2>Invite/Manage Members</h2>
          <BackBtn content={"Back to Trip Menu"} handleBack={this.handleBack}/>

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
                <h3>Current Members:</h3>

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
