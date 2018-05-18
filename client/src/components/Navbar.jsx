import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions.js';
import * as tripActions from '../actions/tripActions.js';
import Logo from '../styles/img/peanut.png'
import Invitation from '../components/Invitation.jsx'



class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleNotifyBox = this.toggleNotifyBox.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.state = {
      show: 'none'
    }
  }

  handleRedirect(){
    if(this.props.ifLoginPage){
      this.props.history.push('/')
    } else {
      this.props.history.push('/home')
    }
  }

  handleLogout(){
    this.props.actions.logOut();
  }

  toggleNotifyBox(){
    let showStatus = this.state.show === 'none' ? 'block' : 'none'
    console.log(showStatus)
    this.setState({
      show: showStatus
    })
  }

  handleAccept(email, tripId) {
    Promise.resolve(this.props.actions.acceptInvitation(email, tripId))
      .then(() => this.props.actions.addMember(tripId))
      .then(() => this.props.actions.getAllTrips())
  }

  handleReject(email, tripId) {
    this.props.actions.rejectInvitation(email, tripId)
  }
  

  render() {
    let {currentUser, invitations} = this.props.userState
    let ifNotification = invitations.length > 0 ? 'block' : 'none' 

    return(
      <div className="navbar">
        <div className="navbar__logo" onClick={this.handleRedirect}>
          <img src={Logo}/>
          <h2>TravelPeanut</h2>
        </div>

        {this.props.ifLoginPage ? '' : 
          <div className="navbar__right">
            <div className="navbar__right-section">
              <span className="navbar__right-section_userImg" onClick={this.toggleNotifyBox}>
                <img src={currentUser.imgUrl} alt=""/>
                <span className="navbar__right-section_notifyDot" style={{'display': `${ifNotification}`}}></span>
             
              </span>
              <span className="navbar__right-section_notifyBox" style={{'display': `${this.state.show}`}}>
                  {invitations.length > 0 ? invitations.map((invitation, index) => {
                      return (
                      <div key={index}>
                      <Invitation
                        invitation={invitation}
                      />
                      <button onClick={() => this.handleAccept(currentUser.email, invitation.id)}>Yes</button>
                      <button onClick={() => this.handleReject(currentUser.email, invitation.id)}>No</button> 
                      </div>
                    )}) 
                    : <span>No pending invitations!</span>
                    
                  }  
              </span>
              <span className="navbar__right-section_notifyBox-arrow"></span>

              <span>
                <span className="navbar__right-section_border"></span>
                <span className="navbar__right-section_logout landing-navbar__animate" onClick={this.handleLogout}>Log Out</span>
              </span>
            </div>
           
          </div>
        }

      
      </div>
    )
  }



}

export default connect(
  state => ({
      userState: state.userReducer,
  }),
  dispatch => ({
      actions: bindActionCreators(Object.assign({}, tripActions, userActions), dispatch)
  })
)(Navbar);

