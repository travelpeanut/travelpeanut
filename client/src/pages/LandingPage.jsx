import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';


class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.actions.goToLogin()
  }

  render() {
    return(
      <div>
        <h1>hi</h1>
        <button onClick={this.handleLogin}>Go to Login</button>
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
)(LandingPage);
