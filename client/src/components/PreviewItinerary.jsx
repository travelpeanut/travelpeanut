import React from 'react';
import ActivityView from './ActivityView.jsx'
import { connect } from "react-redux";
import * as tripActions from '../actions/tripActions.js'
import moment from 'moment';


class PreviewItinerary extends React.Component {
    constructor(props) {
      super(props)
    }
    render(){
        let activities = this.props.activities
        return (
        <div>
            {activities.map((activity, i) => {
            return (
              <div key={i}>
                <hr/>
                    <div>
                        <p>{moment(activity.start_time, "HH:mm:ss").format("h:mm a")}</p>
                        <div>{unescape(activity.description)}</div>
                        <hr />
                    </div>
                <hr/>
              </div>
            )})}
        </div>
        )
    }
}

export default connect(
    state => ({
      tripState: state.tripReducer,
    }),
  )(PreviewItinerary);