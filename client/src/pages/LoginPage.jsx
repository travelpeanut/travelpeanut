import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';


class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    console.log(this.username.value)
    this.props.actions.storeSomething(this.username.value)
  }

  

  
  render() {
    return(
      <div>
        <h1>This is Login Page</h1>
        <input type="text" placeholder='username' ref={username => this.username = username}/>
        <input type="text"/>
        <button onClick={this.handleSubmit}>Log In</button>
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
)(LoginPage);
