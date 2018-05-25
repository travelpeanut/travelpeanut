import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TripList from '../components/TripListHome.jsx'
import * as userActions from '../actions/userActions.js'
import * as tripActions from '../actions/tripActions.js'
import Invitation from '../components/Invitation.jsx'
import Navbar from '../components/Navbar.jsx'
import CreateTripBtn from '../components/CreateTripBtn.jsx'
import Popup from '../components/CreateTripPopup.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.acceptInvitation = this.acceptInvitation.bind(this)
    this.rejectInvitation = this.rejectInvitation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.goToTrip = this.goToTrip.bind(this)
    this.deleteTrip = this.deleteTrip.bind(this)
    this.getInvitations = this.getInvitations.bind(this)
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
      ownerId: this.props.userState.currentUser.id
    }
    this.props.actions.createTrip(data)
  }

  handleClosePopup(){
    this.setState({
      show: 'none'
    })
  }

  goToTrip(item) {
    this.props.actions.setCurrentTrip(item)
  }

  deleteTrip(tripId) {
    const { id } = this.props.userState.currentUser;
    this.props.actions.deleteTrip(tripId, id);
  }

  getInvitations() {
    this.props.actions.getInvitations();
  }


  render() {    
    let {userState} = this.props
    let {tripState} = this.props
    console.log('userState', userState)
    console.log('tripState', tripState)
    return(
      <div className="home">
        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <span className="home-hero__text">Welcome, {userState.currentUser.firstName}!</span>
          <CreateTripBtn handleCreate={this.handleCreate}/>
        </div>

        <Popup  show={this.state.show} location={this.props.location} handleSubmit={this.handleSubmit} handleClosePopup={this.handleClosePopup}/>
        
        <div className="home-container">

          <h2>Your Trips</h2>
          <div className="home-container-list">
            <TripList 
              allTrips={tripState.allTrips} 
              goToTrip={(item) => this.goToTrip(item)}
              currentUserId={userState.currentUser.id}
              deleteTrip={tripId => this.deleteTrip(tripId)}
              allPhotos={tripState.photosList}
            />
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
    actions: bindActionCreators(Object.assign({}, tripActions, userActions), dispatch),
  }),
)(HomePage);
