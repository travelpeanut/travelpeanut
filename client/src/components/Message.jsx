import React from 'react'

const Message = (props) => {  
  return (
   <div>
     <div>{props.firstName}: {props.message}</div>
   </div>
  )
}

export default Message