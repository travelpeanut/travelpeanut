import React from 'react'

const Message = (props) => {  
  return (
    <div className={props.currentUserId === props.user_id 
      ? "me msg"
      : "them msg"
    }>      
      <img src={props.imgUrl}/>
      <span>
        {props.message}
      </span>      
    </div>
  )
}

export default Message