import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class MembersPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {currentTrip} = this.props.tripState

    return(
      <div>
        <h1>View/Edit Members Page for {currentTrip.title}</h1>
        <br/><br/>
        <h3>Add a member</h3>
        <br/>
        <h3>Member List:</h3>
      </div>
    )
  }



}

export default connect(
  state => ({
    tripState: state.tripReducer
  }),
  dispatch => ({
    actions: bindActionCreators(tripActions, dispatch)
  })
)(MembersPage);
