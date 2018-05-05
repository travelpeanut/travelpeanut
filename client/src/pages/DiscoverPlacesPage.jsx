import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class Discovery extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>Discover Places</h1>
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
)(Discovery);