import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';
import Member from "../components/Member.jsx"

class MembersPage extends React.Component {
  constructor(props) {
    super(props)
    this.sendInvite = this.sendInvite.bind(this)
    this.getTripMembers = this.getTripMembers.bind(this)
    this.deleteTripMember = this.deleteTripMember.bind(this)
    this.getPendingInvites = this.getPendingInvites.bind(this)
    this.deleteInvite = this.deleteInvite.bind(this)
  }

  componentDidMount() {
    this.getTripMembers()
    this.getPendingInvites()
  }

  sendInvite(email, tripId, ownerId, ownerEmail, firstName, city) {
    this.props.actions.sendInvite(email, tripId, ownerId, ownerEmail, firstName, city)
    this.email.value = ''
  }

  getPendingInvites() {
    this.props.actions.getPendingInvites(this.props.userState.currentUser.id, this.props.tripState.currentTrip.trip_id)
  }
 
  deleteInvite(email, tripId, ownerId) {
    this.props.actions.deleteInvite(email, tripId, ownerId)
  }

  getTripMembers() {
    this.props.actions.getTripMembers(this.props.tripState.currentTrip.trip_id)
  }

  deleteTripMember(memberId, tripId) {
    this.props.actions.deleteTripMember(memberId, tripId)
  }
  
  render() {
    let {currentTrip, pendingInvites} = this.props.tripState
    let {currentUser} = this.props.userState

    let {first_name} = this.props.userState.currentUser
    let {tripMembers} = this.props.tripState
    console.log(this.props.tripState)
    return(
      <div>
        <h1>View/Edit Members Page for {currentTrip.title}</h1>
        <br/><br/>
        <h3>Owner: {first_name}</h3>
        <br/><br/>
        <h3>Pending invites</h3>
        <ul>
          {pendingInvites.map((invite, index) => {
            return ( 
              <div key = {index}>
                <Member 
                member = {invite.user_email}
                />
                <button
                onClick={() => this.deleteInvite(invite.user_email, currentTrip.trip_id, currentTrip.owner_id)}
                >DELETE INVITATION</button>
              </div>
            )
          })}
        </ul>
        <br/><br/>

        {currentTrip.owner_id === currentUser.id && (<div>
        <h3>Add a member with email</h3>
        <input type='email' placeholder='email' ref={email => this.email = email} />
        <button onClick={() => this.sendInvite(this.email.value, currentTrip.trip_id, currentTrip.owner_id, currentUser.email, currentUser.first_name, currentTrip.city)}>Send Invite</button>
        </div>)}

        <br/>
        <h3>Member List:</h3>
        <ul>
          {tripMembers.map((member, index) => {
            return (
            <div key={index}>
              <Member 
              member={member.first_name}            
              /> 
              <button onClick={() => this.deleteTripMember(member.id, currentTrip.trip_id)}>Delete this member</button>
            </div>
            )
          })}
        </ul>
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
)(MembersPage);
