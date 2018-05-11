import React from 'react'

const Message = (props) => {  
  return (
   <div>
     {/* <img src={props.imgUrl} /> */}
     <div>{props.firstName}: {props.message}</div>
   </div>
  )
}

export default Message