import React from 'react'
import Yelp from '../styles/img/yelp.png'
import Firebase from '../styles/img/firebase.png'

const LandingPageHow = () => {
  return (
    <div>
      {/* Header */}
      <div className="landing-header">        
        <h1>How TravelPeanut Works</h1>
      </div>
      
      {/* GIF */}
      <img className="gif" src="https://media.giphy.com/media/tIibFDsQlTXoWN9do4/giphy.gif"/>

      {/* Container */}
      <div className="landing-how">

        {/* Info 1 */}
        <div className="landing-how-info">
          {/* Google Calender icon */}
          <img src={Firebase}/>
          {/* text */}
          <div className="landing-how-info-text">
            Our chat is powered by Firebase, Google's real time database, which allows us to dynamically render any changes in the database 
          </div>
        </div>


        {/* Info 2 */}
        <div className="landing-how-info">

          <div>
          {/* Yelp icon */}
            <img src={Yelp}/>
            {/* Text */}
            <div className="landing-how-info-text">
              We utilize the Yelp API to find recommendations based on what you're looking for. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, metus id cursus malesuada, neque mauris tincidunt ipsum, 
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default LandingPageHow