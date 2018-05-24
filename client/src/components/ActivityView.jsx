import React from "react";
import moment from 'moment';
import EditActivity from './EditActivity.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js';
import Comments from './Comments.jsx'
import axios from 'axios'

class ActivityView extends React.Component{
    constructor(props){
        super(props)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.voteActivity = this.voteActivity.bind(this)
        this.deleteActivity = this.deleteActivity.bind(this)
        this.getVotesForActivity = this.getVotesForActivity.bind(this)
        this.state = {
            showEdit: false,
            votes: [],
        }
    }

    componentDidMount() {
        this.getVotesForActivity()
    }

    getVotesForActivity() {
        axios.get('/api/votes', {
            params: {
                activityId: this.props.activity.id
            }
        })
        .then(({data}) => {
            this.setState({votes: data.rows})
        })
    }


    deleteActivity() {
        this.props.actions.deleteActivity(this.props.activity.id, this.props.activity.date_of_activity)
    }

    async voteActivity(bool) {
        axios.post('/api/votes', {
            params: {
                activityId: this.props.activity.id,
                userId: this.props.userState.currentUser.id,
                tripId: this.props.tripState.currentTrip.trip_id,
                vote: bool
            }
        })
        .then(() => {
            this.getVotesForActivity()
        })        
    }

    toggleEdit() {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    render(){
        const activity = this.props.activity;
        const upVoteCount = this.state.votes.filter((item, i) => item.vote === true)[0] || {}
        const downVoteCount = this.state.votes.filter((item, i) => item.vote === false)[0] || {}
        return(
            <div>
                <p>{moment(activity.start_time, "HH:mm:ss").format("h:mm a")}</p>
                <div>{unescape(activity.description)}</div>
                <button onClick={() => this.voteActivity(true)}>LET'S DO IT {upVoteCount.count || 0}</button>
                <button onClick={() => this.voteActivity(false)}>MAYBE NOT {downVoteCount.count || 0}</button>
                <button onClick={this.toggleEdit} > Edit </button>
                <button onClick={this.deleteActivity} >delete</button>
                {this.state.showEdit ? <EditActivity
                    activity={activity}
                    toggleEdit={this.toggleEdit}
                />
                : null }
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
    }),
    dispatch => ({
        actions: bindActionCreators(Object.assign({}, tripActions, discoverActions) , dispatch)
    })
  )(ActivityView);
