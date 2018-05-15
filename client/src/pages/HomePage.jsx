import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import TripList from '../components/TripListHome.jsx';
import * as userActions from '../actions/userActions';
import * as tripActions from '../actions/tripActions';
import Invitation from '../components/Invitation.jsx';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToTrip = this.goToTrip.bind(this);
    this.deleteTrip = this.deleteTrip.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.getInvitations = this.getInvitations.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.rejectInvitation = this.rejectInvitation.bind(this);
    this.state = {
      show: 'none',
    };
  }

  componentDidMount() {
    this.getInvitations();
    this.props.actions.getAllTrips();
  }

  handleCreate() {
    this.setState({
      show: 'block',
    });
  }


  acceptInvitation(email, tripId) {
    Promise.resolve(this.props.actions.acceptInvitation(email, tripId))
      .then(() => this.props.actions.addMember(tripId))
      .then(() => this.props.actions.getAllTrips());
  }

  rejectInvitation(email, tripId) {
    this.props.actions.rejectInvitation(email, tripId);
  }

  handleSubmit() {
    this.setState({
      show: 'none',
    });

    const data = {
      name: this.name.value,
      city: this.city.value,
      country: this.country.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      province: '',
      // ownerId needs to come from login state. hard coded right now
      ownerId: this.props.userState.currentUser.id,
    };

    this.props.actions.createTrip(data);
  }

  goToTrip(trip) {
    this.props.actions.setCurrentTrip(trip);
  }

  deleteTrip(tripId) {
    const { id } = this.props.userState.currentUser;
    this.props.actions.deleteTrip(tripId, id);
  }

  getInvitations() {
    this.props.actions.getInvitations();
  }

  handleLogOut() {
    this.props.actions.logOut();
  }

  render() {    
    const { userState, tripState } = this.props;    
    return (
      <div>

        <div>
          <h1>Home Page (after user logs in)</h1>
          <p>Welcome, {userState.currentUser.firstName}!</p>
          <button onClick={this.handleLogOut}>Log out</button>
          <hr/>
          <br/>

          <button onClick={this.handleCreate}>Create A Trip</button>

          <br/><br/>

          <div style={{ display: `${this.state.show}` }}>
            <input type="text" placeholder="Trip Name" ref={name => this.name = name }/>
            <br/>
            <input type="text" placeholder="City" ref={city => this.city = city}/>
            <br/>
            <input type="text" placeholder="Country" ref={country => this.country = country}/>
            <br/>
            <input type="date" placeholder="Start Date" ref={startDate => this.startDate = startDate}/>
            <br/>
            <input type="date" placeholder="End Date" ref={endDate => this.endDate = endDate}/>
            <br/>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>

          {userState.invitations && userState.invitations.map((invitation, index) => (
            <div key={index}>
            <Invitation
              invitation={invitation}
            />
            <button onClick={() => this.acceptInvitation(userState.currentUser.email, invitation.id)}>Yes</button>
            <button onClick={() => this.rejectInvitation(userState.currentUser.email, invitation.id)}>No</button> 
            </div>),)}


          <h2>Show All trips:</h2>
          <TripList
            allTrips={tripState.allTrips}
            goToTrip={trip => this.goToTrip(trip)}
            currentUserId={userState.currentUser.id}
            deleteTrip={tripId => this.deleteTrip(tripId)}
          />
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
    actions: bindActionCreators(Object.assign({}, tripActions, userActions), dispatch),
  }),
)(HomePage);
