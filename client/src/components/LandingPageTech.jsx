import React from 'react'
import firebase from '../styles/img/firebase-landing.png'
import node from '../styles/img/nodejs.png'
import express from '../styles/img/express.png'
import postgres from '../styles/img/postgres.png'
import redux from '../styles/img/redux.png'
import react from '../styles/img/react.png'
import aws from '../styles/img/aws.png'
import reactRouter from '../styles/img/react-router.png'

const LandingPageTech = () => {
  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="landing-header">TravelPeanut is powered by:</h1>
      </div>

      {/* Container */}
      <div className="technology">
        {/* Tech used */}
        <div> 
          <img src={react}/>
        </div>

        <div>
          <img src={redux}/>
        </div>

        <div>
          <img src={reactRouter}/>
        </div>

        <div>
          <img src={node}/>
        </div>

        <div>
          <img src={postgres}/>
        </div>

        {/* <div>
          <img src={express}/>
        </div> */}

        <div>
          <img src={firebase}/>
        </div>

        <div>
          <img src={aws}/>
        </div>
        
      </div>

    </div>
  )
}

export default LandingPageTech