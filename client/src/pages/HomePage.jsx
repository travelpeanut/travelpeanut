import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import TripList from '../components/TripListHome.jsx';
import * as userActions from '../actions/userActions.js';
import * as tripActions from '../actions/tripActions.js';


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.goToTrip = this.goToTrip.bind(this)
    this.getAllTrips = this.getAllTrips.bind(this) 
    this.deleteTrip = this.deleteTrip.bind(this)
    this.state = {
      show: 'none'
    }
  }

  componentDidMount(){
    this.getAllTrips()
  }

  getAllTrips(){
    let {currentUser} = this.props.userState
    this.props.actions.getAllTrips(currentUser.id)
  }

  handleCreate(){

    this.setState({
      show: 'block'
    })


     
  }

  handleSubmit(){

    this.setState({
      show: 'none'
    })

    let data = {
      name: this.name.value,
      city: this.city.value,
      country: this.country.value
    }
    
    this.props.actions.createTrip(data)
  }

  goToTrip(item){

    this.props.actions.setCurrentTrip(item)
  }

  deleteTrip(tripId){
    console.log('delete clicked', tripId)
    this.props.actions.deleteTrip(tripId)
  }


  render() {
    console.log('this is trip state:', this.props.tripState);
    let {userState} = this.props
    let {tripState} = this.props
    console.log('this is user state:', userState)
    return(
      <div>

        <div>
          <h1>Home Page (after user logs in)</h1>
          <p>User name: {userState.currentUser.username}</p>

          <hr/>
          <br/>

          <button onClick={this.handleCreate}>Create A Trip</button>

          <br/><br/>

          <div style={{'display':`${this.state.show}`}}>
            <input type="text" placeholder="Trip Name" ref={name => this.name = name }/>
            <br/>
            <input type="text" placeholder="City" ref={city => this.city = city}/>
            <br/>
            <input type="text" placeholder="Country" ref={country => this.country = country}/>
            <br/>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>

          
          <h2>Show All trips:</h2>
          <TripList 
            allTrips={tripState.allTrips} 
            goToTrip={(item) => this.goToTrip(item)}
            currentUserId={userState.currentUser.id}
            deleteTrip={(tripId) => this.deleteTrip(tripId)}
          />



        </div>

       
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
      actions: bindActionCreators(Object.assign({}, tripActions), dispatch)
  })
)(HomePage);
