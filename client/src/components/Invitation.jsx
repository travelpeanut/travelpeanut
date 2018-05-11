import React from 'react';

const Invitation = ({invitation}) => {
  return (
    <li>
     <strong>{invitation.first_name}</strong> is inviting you to partake in the magical <strong>"{invitation.title}"</strong> journey!
     </li>
  )
}

export default Invitation;