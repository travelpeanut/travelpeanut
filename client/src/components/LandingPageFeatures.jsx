import React from 'react'
import Google from '../../../client/src/styles/img/google-landing.png'
import Globe from '../../../client/src/styles/img/earth-globe.png'
import Chat from '../../../client/src/styles/img/chat-landing.png'
const LandingPageFeatures = () => {
  return (
    <div>
      {/* Header */}
      <div className="landing-header">
        <h1>Planning your next adventure with friends doesn't have to be a nightmare</h1>
      </div>

      {/* Container for information about features */}
      <div className="landing-a-container">

        {/* Features */}
        <div className="landing-a-info">
          <h2 className="landing-a-title">Go Exploring</h2>
          <img src={Globe}/>
          <h4 className="landing-a-feature">Create and plan out your trip</h4>
          <br />
          <div className="landing-a-descr">Know what you want to do? Just add it to your trip! Don't know? No worries! Let us recommend some things to do for you!</div>
        </div>

        <div className="landing-a-info">
          <h2 className="landing-a-title">Connect With Google</h2>
          <img src={Google}/>
          <h4 className="landing-a-feature">Sync your trip with your google account</h4>
          <br />
          <div className="landing-a-descr">Never forget what you have planned next, simply by exporting your trip itinerary to your Google account!</div>
        </div>

        <div className="landing-a-info">
          <h2 className="landing-a-title">Chat and Coordinate</h2>
          <img src={Chat}/>
          <h4 className="landing-a-feature">Talk and coordinate with your friends</h4>
          <br />
          <div className="landing-a-descr">Invite your friends through email, then use our chat feature to discuss your next adventure!</div>
        </div>
        
      </div>
    </div>
  )
}

export default LandingPageFeatures