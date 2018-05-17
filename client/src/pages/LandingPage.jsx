import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';
import Navbar from '../components/Navbar.jsx'
import Logo from '../styles/img/peanut.png'


class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin() {
    this.props.actions.goToLogin()
  }

  handleSignup() {
    this.props.actions.goToSignup();
  }

  render() {
    console.log(this.props.userState)
    return(
      <div className="landing">
        <div className="landing-navbar navbar">
          <div className="navbar__logo">
            <img src={Logo}/>
            <span className="landing-navbar__login landing-navbar__animate" onClick={this.handleLogin}>Log In</span>
            <span className="landing-navbar__signup landing-navbar__animate" onClick={this.handleLogin}>Sign Up</span>
          </div>
        </div>
        <div className="landing-hero">
          <div className="landing-hero__text">
              <h1>TravelPeanut</h1>
              <p>Trip planner for group peanuts</p>
          </div>
        </div>

        <div className="landing-content landing-content-a">
          content
        </div>
  
        <div className="landing-content landing-content-b">content</div>

        <div className="landing-content landing-content-c">content</div>

        <div className="landing-footer">footer content</div>



        <div className="iconRef">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>  

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
