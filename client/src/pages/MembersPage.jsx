import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';
import Member from "../components/Member.jsx"

class MembersPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTripMembers = this.getTripMembers.bind(this)
    this.deleteTripMember = this.deleteTripMember.bind(this)
  }

  componentDidMount() {
    this.getTripMembers()
  }

  handleSubmit(){
    this.props.actions.addMember({username: this.username.value, tripId: this.props.tripState.currentTrip.trip_id})
    this.username.value = ''
  }
 
  getTripMembers() {
    this.props.actions.getTripMembers(this.props.tripState.currentTrip.trip_id)
  }

  deleteTripMember(member, trip) {
    Promise.resolve(this.props.actions.deleteTripMember(member, trip))
      .then(() => {
        this.getTripMembers();
      })
  }
  
  render() {
    let {currentTrip} = this.props.tripState
    let {first_name} = this.props.userState.currentUser
    let {tripMembers} = this.props.tripState
    console.log(this.props.tripState)
    return(
      <div>
        <h1>View/Edit Members Page for {currentTrip.title}</h1>
        <br/><br/>
        <h3>Owner: {first_name}</h3>
        <h3>Add a member with Username</h3>
        <input type='text' placeholder='username' ref={username => this.username = username} />
        <button onClick={this.handleSubmit}>Add</button>
        <br/>
        <h3>Member List:</h3>
        <ul>
          {tripMembers.map((member, index) => {
            return (
            <div key={index}>
              <Member 
              member={member.first_name}            
              /> 
              <button onClick={() => this.deleteTripMember(member, currentTrip)}>Delete this member</button>
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
