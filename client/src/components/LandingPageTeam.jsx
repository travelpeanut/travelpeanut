import React from 'react'
import github from '../styles/img/github.png'

const LandingPageTeam = () => {
 return (
   <div>
     
    {/* Header */}
    <div className="landing-header">
      <h1>The People Behind TravelPeanut </h1>
    </div>

    {/* Container */}
    <div className="landing-c-container">

      {/* Heidi */}
      <div className="team">
        <div className="team-image flip-container">
          <div className="team-container textWithBlurredBg">
            <div className="team-info">
              Corgies, Samyoed, and LINE stickers
            </div>
            <img src="https://avatars0.githubusercontent.com/u/12095864?s=460&v=4"/>          
          </div>          
        </div>        

        <div className="team-name">          
          <h4>Heidi Poon</h4>
          <div>Product Lead | Front-End Developer</div>
          <a className="github" href="https://github.com/heidixpoon" target="_blank"><img src={github}/></a>
        </div>
      </div>

      {/* David */}
      <div className="team">
        <div className="team-image flip-container">
          <div className="team-container textWithBlurredBg">
            <div className="team-info">

            </div>
            <img src="https://avatars1.githubusercontent.com/u/29075711?s=400&u=b9f08e4198042d7afc21212413241a9bce58a390&v=4"/>          
          </div>          
        </div>
        

        <div className="team-name">          
          <h4>David Baek</h4>
          <div>Scrum Master | Back-End Developer</div>
          <a className="github" href="https://github.com/davidbaek92" target="_blank"><img src={github}/></a>
        </div>

      </div>

      {/* Brian */}
      <div className="team">
        <div className="team-image flip-container">
          <div className="team-container textWithBlurredBg">
            <div className="team-info">

            </div>
            <img src="https://avatars3.githubusercontent.com/u/35786667?s=460&v=4"/>          
          </div>          
        </div>
        

        <div className="team-name">          
          <h4>Brian Fang</h4>
          <div>Back-End Developer</div>
          <a className="github" href="https://github.com/bfang212" target="_blank"><img src={github}/></a>
        </div>
      </div>
      
      {/* Ryan */}
      <div className="team">
        <div className="team-image flip-container">
          <div className="team-container textWithBlurredBg">
            <div className="team-info">

            </div>
            <img src="https://avatars1.githubusercontent.com/u/34013422?s=460&v=4"/>          
          </div>          
        </div>
        

        <div className="team-name">          
          <h4>Ryan Schabel</h4>
          <div>Front-End Developer</div>
          <a className="github" href="https://github.com/schabel12" target="_blank"><img src={github}/></a>
        </div>
      </div>

    </div>
  </div>
 ) 
}

export default LandingPageTeam