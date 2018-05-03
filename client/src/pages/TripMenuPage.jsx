import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tripActions from '../actions/tripActions.js';


class TripMenu extends React.Component {
  constructor(props) {
    super(props)
  }

 

  
  render() {
    return(
      <div>
        <h1>Trip Menu</h1>

        <br/>
        <button>View Itinerary</button>
        <br/>
        <button>Discover Places</button>
        <br/>
        <button>View/Add Members for this Trip</button>

       
      </div>
    )
  }



}


export default connect(
  state => ({
      tripState: state.tripReducer,
  }),
  dispatch => ({
      actions: bindActionCreators( tripActions , dispatch)
  })
)(TripMenu);
