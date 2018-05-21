import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Logo from '../styles/img/peanut.png'
import * as tripActions from '../actions/tripActions.js'


class CreateTripPopup extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  handleSubmit(){

    this.props.handleClosePopup()

    let data = {
      name: this.name.value,
      city: this.city.value,
      country: this.country.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      ownerId: this.props.userState.currentUser.id
    }
    this.props.actions.createTrip(data)
  }

  closePopup(){
    this.props.handleClosePopup()
  }

  render() {
    return (
      <div className="c-popup--overlay" style={{'display':`${this.props.show}`}}>
        <div className="c-popup">
          <div>
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
            <button onClick={this.closePopup}>Cancel</button>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>

          <div className="c-popup__btns">
              
          </div>
        </div>
    </div> 
    )
  }
}


export default connect(
  state => ({
    userState: state.userReducer
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions), dispatch)
  })
)(CreateTripPopup);