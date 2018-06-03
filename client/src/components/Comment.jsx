import React from 'react'

const Comment = ({comment, commentKey, deleteComment}) => {
  return (
    <div className="activity-comments-item" onClick={() => deleteComment(commentKey)}>
      <span className="activity-comments-item__User">{comment.firstName}</span>
      <span className="activity-comments-item__Msg">{comment.comment}</span>
    </div>
  )
}

export default Comment

