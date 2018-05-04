import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';


class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    console.log(this.username.value)
    let data = {
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this.password.value
    }
    this.props.actions.signUp(data)
  }

  

  
  render() {
    return(
      <div>
        <h1>Sign Up</h1>
        <br/>
        <input type="text" placeholder='Username' ref={username => this.username = username}/>
        <input type="text" placeholder='First name' ref={firstName => this.firstName = firstName}/>
        <input type="text" placeholder='Last name' ref={lastName => this.lastName = lastName}/>
        <input type="password" placeholder='Password' ref={password => this.password = password}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }



}


export default connect(
  state => ({
      userState: state.userReducer,
  }),
  dispatch => ({
      actions: bindActionCreators( userActions , dispatch)
  })
)(SignUp);