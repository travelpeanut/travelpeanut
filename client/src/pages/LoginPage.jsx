import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js'
import firebase, {auth} from '../../../firebase'
import icon from '../styles/img/googleIcon.png'
import Navbar from '../components/Navbar.jsx'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){    
    this.props.actions.loginGoogle()  
  }


  render() {
    return(
      <div className="login">
        <Navbar {...this.props} ifLoginPage={true} />
        <div className="login__container">
          <div className="login__container-section login__container-section-left">
            <h2>Log In</h2>
            <div className="login__container-btn" onClick={this.handleSubmit}>
              <img src={icon} />
              <p>via Google</p>
            </div>
          </div>
          <div className="login__container-section">
            <h2>Sign Up</h2>
            <div className="login__container-btn" onClick={this.handleSubmit}>
              <img src={icon} />
              <p>via Google</p>
            </div>
          </div>
          
         
        </div>

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

