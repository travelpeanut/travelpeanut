import React from "react";
import moment from 'moment';
import EditActivity from './EditActivity.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js';
import Comments from './Comments.jsx'

class ActivityView extends React.Component{
    constructor(props){
        super(props)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)
        this.state = {
            showEdit: false,
        }
    }

    upVote(activityId, activityDate){
        const userId = this.props.userState.currentUser.id
        const tripId = this.props.tripState.currentTrip.trip_id
        let upVoteObj = {
            activityId,
            userId,
            tripId,
            activityDate,
        }
        this.props.actions.upVote(upVoteObj)

    }

    downVote(activityId, activityDate){
        const userId = this.props.userState.currentUser.id
        const tripId = this.props.tripState.currentTrip.trip_id
        let downVoteObj = {
            activityId,
            userId,
            tripId,
            activityDate,
        }
        this.props.actions.downVote(downVoteObj)
    }

    toggleEdit(){
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    render(){
        // let votesData = this.props.tripState.votesForThisDate;
        let activity = this.props.activity;
        // let upvoteCount = 0
        // let downvoteCount = 0
        // if (typeof votesData.data.rows !== 'undefined'){
        //     votesData.data.rows.forEach(row => {
        //         if (row.activity_id === activity.id && row.vote){
        //             upvoteCount += 1
        //         } else if (row.activity_id === activity.id && !row.vote){
        //             downvoteCount += 1
        //         }
        //     })
        // }
        return(
            <div>
                <p>{moment(activity.start_time, "HH:mm:ss").format("h:mm a")}</p>
                <div>{unescape(activity.description)}</div>
                <button onClick={() => this.upVote(activity.id, activity.date_of_activity)}>upvote</button>
                <button onClick={() => this.downVote(activity.id, activity.date_of_activity)}>downvote</button>
                <button onClick={this.toggleEdit} > Edit </button>
                {this.state.showEdit ? <EditActivity
                    activity={activity}
                    toggleEdit={this.toggleEdit}
                />
                : null }
                {/* <div>Upvotes: {upvoteCount}</div>
                <div>Downvotes: {downvoteCount}</div> */}
              <hr />
                <Comments activity={activity}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        tripState: state.tripReducer,
        userState: state.userReducer,
        votesForThisDate: state.tripReducer.votesForThisDate
    }),
    dispatch => ({
        actions: bindActionCreators(Object.assign({}, tripActions, discoverActions) , dispatch)
    })
  )(ActivityView);
