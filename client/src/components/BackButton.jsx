import React from 'react'
import Icon from '../styles/img/back.png'

const BackButton = ({handleBack, content, classname}) => {
  return (
    <div className={`c-backbtn ${classname}`} onClick={handleBack}>
      <img src={Icon} />
      <span className="c-backbtn-content">{content}</span>
    </div>
  )
}

export default BackButton