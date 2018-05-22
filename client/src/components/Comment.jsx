import React from 'react'

const Comment = ({comment, commentKey, deleteComment}) => {
  return (
    <div onClick={() => deleteComment(commentKey)}>
      {comment.firstName}: {comment.comment}
    </div>
  )
}

export default Comment

