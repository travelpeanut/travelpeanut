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
    this.state = {
      show: 'none'
    }
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

  goToTrip(){

    this.props.actions.setCurrentTrip()
  }


  render() {
    console.log('this is trip state:', this.props.tripState);
    let {userState} = this.props
    let {tripState} = this.props

    return(
      <div>

        <div>
          <h1>Home Page (after user logs in)</h1>
          <p>User name: {userState.something}</p>

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

          
          <h3>Show All trips:</h3>

          {
            tripState.temp.name ? 
              <div>
                <p>{tripState.temp ? tripState.temp.name : ''}</p>
                  <p>{tripState.temp ? tripState.temp.city : ''}</p>
                  <Link to={`/trip/${tripState.temp.name}`}>Go To Trip</Link>

              </div>
            : ''
          }
         



          <div>
            <h3>dumbie trip</h3>

            <button onClick={this.goToTrip}>Go to Trip</button>
          </div>


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
      actions: bindActionCreators(tripActions, dispatch)
  })
)(HomePage);
