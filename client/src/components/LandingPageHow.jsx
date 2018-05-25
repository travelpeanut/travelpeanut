import React from 'react'
import Yelp from '../styles/img/yelp.png'
import Firebase from '../styles/img/firebase.png'

const LandingPageHow = () => {
  return (
    <div>
      {/* Header */}
      <div className="landing-header landing-header-b">        
        <h1>How TravelPeanut Works</h1>
      </div>
      
      <div className="landing-header-b-grid grid">
        <div className="row">
          <div className="col col-5-of-12">
            <img className="gif" src="https://media.giphy.com/media/tIibFDsQlTXoWN9do4/giphy.gif"/>
          </div>

          <div className="col col-1-of-12"></div>
          <div className="col col-6-of-12">

            <div className="landing-header-b-content">
            {/* Yelp icon */}
              <img src={Yelp}/>
              {/* Text */}
              <div className="landing-how-info-text">
                We utilize the Yelp API to find recommendations based on what you're looking for, so that you exactly what you want out of your trip.
              </div>
            </div>


            <div className="landing-how-info">
              {/* Google Calender icon */}
              <img src={Firebase}/>
              {/* text */}
              <div className="landing-how-info-text">
                Our chat is powered by Firebase, Google's real time database, allowing us to dynamically render any new messages that are sent.
              </div>
            </div>

          </div>
        </div>
      </div>

     
    </div>
  )
}

export default LandingPageHow