import React from 'react';
import Logo from '../styles/img/peanut.png'

const CreateTripBtn = ({handleCreate}) => {
  return (
    <div className="home-hero__create" onClick={handleCreate}>
      <span className="home-hero__create-logo">
        <img src={Logo} alt=""/>
      </span>
    </div>
  )
}

export default CreateTripBtn;