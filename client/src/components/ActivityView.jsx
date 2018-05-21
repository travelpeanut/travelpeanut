import React from "react";
import moment from 'moment';
import EditActivity from './EditActivity.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js';

class ActivityView extends React.Component{
    constructor(props){
        super(props)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)
        this.getVotes = this.getVotes.bind(this)
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
        console.log('upvoteObj:', upVoteObj)
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
    console.log('downvoteObj:', downVoteObj)
    this.props.actions.downVote(downVoteObj)
    }

    toggleEdit(){
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    getVotes(){

        this.props.actions.getVotes
        
    }

    render(){
        const activity = this.props.activity;
        // const upVotes = this.state.upVotesDnVotes[0];
        // const downVotes = this.state.upVotesDnVotes[1];
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
                <div>Upvotes: {this.state.upvoters}</div>
                <div>Downvotes: {this.state.downvoters}</div>
              <hr />
            </div>
        )
    }
}

export default connect(
    state => ({
        tripState: state.tripReducer,
        userState: state.userReducer
    }),
    dispatch => ({
        actions: bindActionCreators(Object.assign({}, tripActions, discoverActions) , dispatch)
    })
  )(ActivityView);
