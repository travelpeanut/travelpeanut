import React from "react";
import moment from 'moment';
import EditActivity from './EditActivity.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripActions from '../actions/tripActions.js';
import * as discoverActions from '../actions/discoveryActions.js';
import Comments from './Comments.jsx'
import axios from 'axios'
import Happy from '../styles/img/happy.png'
import Sad from '../styles/img/sad.png'

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
            <div className="activity">

                <div className="grid">
                    <div className="row">
                        <div className="col col-2-of-12">
                            <p className="activity-time">{moment(activity.start_time, "HH:mm:ss").format("h:mm a")}</p>
                          
                        </div>
                        <div className="col col-8-of-12">
                            <p className="activity-title">{unescape(activity.description)}</p>
                            <hr className="activity-title-hr"/>
                        </div>
                        <div className="col col-2-of-12 activity-votes">
                            <div className="activity-upvote">
                                <div className="activity-upvote-happy" onClick={() => this.voteActivity(true)}>
                                    <img className="activity-upvote-happy-img" src={Happy} alt=""/>
                                </div>
                                <span className="activity-count">{upVoteCount.count || 0}</span>
                            </div>
                            <div className="activity-downvote">
                                <div className="activity-downvote-sad" onClick={() => this.voteActivity(false)}>
                                    <img className="activity-downvote-sad-img" src={Sad} alt=""/>
                                </div>
                                <span className="activity-count">{downVoteCount.count || 0}</span>
                            </div>

                      
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-3-of-12 center">
                            <Comments activity={activity}/>
                        </div>
                        <div className="col col-2-of-12">
                            <div className="activity-selection">
                                <button className="btn-tran btn-tran-medium draw-border" onClick={this.toggleEdit} >Edit Activity</button>
                                <button className="btn-tran btn-tran-medium draw-border" onClick={this.deleteActivity} >Delete Activity</button>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col col-5-of-12 center">
                            {this.state.showEdit ? <EditActivity
                                activity={activity}
                                toggleEdit={this.toggleEdit}
                            />
                            : null }
                        </div>

                    </div>

                   
                </div>


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
