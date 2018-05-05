import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

import * as userActions from '../actions/userActions.js';
import * as tripActions from '../actions/tripActions.js';


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.goToTrip = this.goToTrip.bind(this)
    this.getAllTrips = this.getAllTrips.bind(this) 
    this.state = {
      show: 'none'
    }
  }

  componentDidMount(){
    this.getAllTrips()
  }

  getAllTrips(){
    let userId = 2
    this.props.actions.getAllTrips(userId)
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
      country: this.country.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      province: '', 
      // ownerId needs to come from login state. hard coded right now
      ownerId: this.props.userState.currentUser.id
    }
    
    this.props.actions.createTrip(data)
  }

  goToTrip(item){

    this.props.actions.setCurrentTrip(item)
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
            <input type="text" placeholder="Start Date" ref={startDate => this.startDate = startDate}/>
            <br/>
            <input type="text" placeholder="End Date" ref={endDate => this.endDate = endDate}/>
            <br/>          
            <button onClick={this.handleSubmit}>Submit</button>
          </div>

          
          <h2>Show All trips:</h2>

          {
            tripState.allTrips.map((item, i) => {
              return (
                <div key={i}>
                  <p>{item.title}</p>
                  <button onClick={()=> this.goToTrip(item)}>Go to Trip</button>

                </div>
              )
            }) 
              
          }
         



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
