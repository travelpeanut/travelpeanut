import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';


class PreviewItinerary extends React.Component {
    constructor(props) {
      super(props)
    }
    render(){
        let activities = this.props.tripState.activitiesForThisDate
        return (
        <div className="preview">
            {activities.map((activity, i) => {
            return (
              <div key={i}>
                    <div className="preview-item">
                        <span className="preview-item-time">{moment(activity.start_time, "HH:mm:ss").format("h:mm a")} - </span>
                        <span className="preview-item-detail">{unescape(activity.description)}</span>
                    </div>
                    <hr className="preview-hr"/>
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