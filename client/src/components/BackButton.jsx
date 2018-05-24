import React from 'React'
import Icon from '../styles/img/back.png'

const BackButton = ({handleBack, content}) => {
  return (
    <div className="c-backbtn" onClick={handleBack}>
      <img src={Icon} />
      <span className="c-backbtn-content">{content}</span>
    </div>
  )
}

export default BackButton