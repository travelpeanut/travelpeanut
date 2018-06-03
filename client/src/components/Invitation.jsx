import React from 'react';

const Invitation = ({ invitation }) => (
    <div>
     <strong>{invitation.first_name}</strong> is inviting you to partake in the magical <strong>"{invitation.title}"</strong> journey!
    </div>
);

export default Invitation;
