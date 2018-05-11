import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';
// import firebase, { auth, provider } from '../../../firebase/firebase.js';
import firebase, {auth} from '../../../firebase'


class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit(){
  //   console.log(this.username.value, this.password.value)
  //   this.props.actions.checkLogin({username: this.username.value, password: this.password.value})
  // }

  handleSubmit(){
    console.log(this.username.value, this.password.value)
    this.props.actions.loginGoogle();   

  }



  render() {
    console.log(this.props.userState);
    return(
      <div>
        <h1>This is Login Page</h1>
        
        <button onClick={this.handleSubmit}>Log In via Google</button>

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


// <input type="text" placeholder='username' ref={username => this.username = username}/>
//         <input type="password" placeholder='password' ref={password => this.password = password}/>