import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js'
import * as discoverActions from '../actions/discoveryActions.js'
import EditActivity from '../components/EditActivity.jsx'

import moment from 'moment';
import ActivityView from '../components/ActivityView.jsx'
import Comments from '../components/Comments.jsx'
import BackBtn from '../components/BackButton.jsx'
import Navbar from '../components/Navbar.jsx'
import CreateBtn from '../components/CreateTripBtn.jsx'
import Popup from '../components/AddActivityPopup.jsx'

class TripDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addActivityView: false,
      showEdit: false,
      editActivityKey: null, 
      showPopup: 'none'
    }
    this.showEdit = this.showEdit.bind(this)
    this.getActivities = this.getActivities.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
  }

  componentDidMount() {
    this.getActivities()    
  }  
  
  componentWillUnmount() {        
    this.props.actions.clearActivities()    
  }

  showEdit(index){
    let editKey = this.state.editActivityKey    
    if (index === editKey){
      editKey = null;      
    } else {
      editKey = index      
    }
    this.setState({
      editActivityKey: editKey
    })
  }

  addActivity(){    
    const activityDate = moment(this.props.location.dateOfDayOfWeek,'MMM Do YYYY').format('YYYY-MM-DD')
    const startTime = moment(this.time.value + ' ' + this.ampm.value, 'hh:mm a').format('hh:mm a')
    this.props.actions.addCustomActivity(this.activity.value, startTime, activityDate)
  }

  getActivities() {
    const date = moment(this.props.location.dateOfDayOfWeek, 'MMM Do YYYY').format('YYYY-MM-DD')
    this.props.actions.getActivitiesForDate(date)
  }

  handleBack() {
    const tripId = this.props.tripState.currentTrip.trip_id
    this.props.history.push(`/trip/${tripId}/itinerary`)
  }

  handleCreate(){
    this.setState({
      showPopup: 'block'
    })
  }

  handleClosePopup(){
    this.setState({
      showPopup: 'none'
    })
  }

  render() {
    const {currentTrip} = this.props.tripState
    const activities = this.props.tripState.activitiesForThisDate
    console.log('tripState in TripDetailPage: ', this.props.tripState)
    console.log('activities in TripDetailPage: ', activities)
    
    // const tripStartDate = this.props.tripState.currentTrip.start_date
    // const start = moment(tripStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD hh:mm a')    
    // const time = [];
    // for (let i = 0; i < 48; i++) {
    //   time.push(moment(start, 'YYYY-MM-DD hh:mm a').add(15*(i), 'minutes').format('hh:mm'))
    // }

    return(
      <div className="tripDetails">

        <Navbar {...this.props} ifLoginPage={false} />
        <div className="home-hero">
          <p className="home-hero__text">{currentTrip.title}</p>
          <p className="home-hero__textLocation">{currentTrip.city}, {currentTrip.country}</p>
          <CreateBtn handleCreate={this.handleCreate}/>
        </div>

        <Popup show={this.state.showPopup} location={this.props.location} handleClosePopup={this.handleClosePopup}/>


        <BackBtn content={"Back to Trip Itinerary"} handleBack={this.handleBack}/>

        <div className="tripDetails-container">
          <h2>Day: {this.props.location.day}</h2>

          <div className="tripDetails-container-list">
         
            {activities.map((activity, i) => {
              return (
                <div key={i}>
                  <ActivityView activity={activity}/>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
      tripState: state.tripReducer,
      userState: state.userReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions, discoverActions) , dispatch)
  })
)(TripDetail);