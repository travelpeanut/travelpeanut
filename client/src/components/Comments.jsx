import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Comment from './Comment.jsx'
import * as tripActions from '../actions/tripActions.js';
import * as commentActions from '../actions/commentActions.js';
import { fbDb } from '../../../firebase/firebase'

class Comments extends React.Component{
  constructor() {
    super()
    this.state = {
      comments: [],
    }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.getComments = this.getComments.bind(this)
  this.deleteComment = this.deleteComment.bind(this)
  }

  componentDidMount() {
    this.getComments()
  } 

  handleSubmit() {
    const comment = this.comment.value
    const activityId = this.props.activity.id
    this.props.actions.sendComment(comment, activityId)
    this.comment.value = ''
  }  

  getComments() {    
    const tripId = this.props.tripState.currentTrip.trip_id   
    const activityId = this.props.activity.id
    fbDb.child(`${tripId}/activities/${activityId}/comments`)
      .on('value', (snapshot) => {
        let comments = snapshot.val() || {}
        comments = Object.keys(comments).map(key => [key, comments[key]]);
        this.setState({
          comments: comments
        })      
      })
  }
  
  deleteComment(commentKey) {
    const tripId = this.props.tripState.currentTrip.trip_id
    const activityId = this.props.activity.id   
    fbDb.child(`${tripId}/activities/${activityId}/comments/${commentKey}`)
      .remove()
  }

  render() {    
    console.log('comments', this.state.comments)
    return(
      <div>
        <div>Comment Box</div>
        {this.state.comments.map((item, i) => {
          const key = item[0]
          return (
            <Comment key={i} commentKey={key} comment={item[1]} deleteComment={this.deleteComment}/>
          )
        })}
        <input placeholder='enter comment' type="text" ref={(comment) => this.comment = comment}/>
        <button onClick={this.handleSubmit}>submit comment</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    userState: state.userReducer,
    tripState: state.tripReducer,
    commentState: state.commentReducer,
  }),
  dispatch => ({
    actions: bindActionCreators(Object.assign({}, commentActions, tripActions), dispatch),
  }),
)(Comments);
