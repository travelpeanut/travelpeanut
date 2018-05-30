import React from 'react'
import github from '../styles/img/github.png'
import brianfang from '../styles/img/brianfang.jpg'
import david from '../styles/img/david.jpg'
import heidi from '../styles/img/heidi.jpg'
import ryan from '../styles/img/ryan.jpg'

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
        <div className="team-info">
          <img className="team-img" src={heidi} />
          <div className="team-info-description">Loves photography, the great outdoors, and free diving</div>
        </div>

        <div className="team-position">
          <div className="team-name">Heidi Poon</div>
          <div className="team-title">Product Lead | Full-Stack Developer & UI Designer</div>
        </div>

        <div className="github">
          <a href="https://github.com/heidixpoon" target="_blank"><img className="github-icon" src={github}/></a>
        </div>
      </div>

      {/* David */}
      <div className="team">
        <div className="team-info">
          <img className="team-img" src={david} />
          <div className="team-info-description">Loves music, a good IPA, and all things soccer</div>
        </div>

        <div className="team-position">
          <div className="team-name">David Baek</div>
          <div className="team-title">Scrum Master | Full-Stack Developer</div>
        </div>

        <div className="github">
          <a href="https://github.com/davidbaek92" target="_blank"><img className="github-icon" src={github}/></a>
        </div>
      </div>

      {/* Brian */}
      <div className="team">
        <div className="team-info">
          <img className="team-img" src={brianfang} />
          <div className="team-info-description">Loves being Brian Fang</div>
        </div>

        <div className="team-position">
          <div className="team-name">Brian Fang</div>
          <div className="team-title">Full-Stack Developer</div>
        </div>

        <div className="github">
          <a href="https://github.com/bfang212" target="_blank"><img className="github-icon" src={github}/></a>
        </div>
      </div>

      {/* Ryan */}
      <div className="team">
        <div className="team-info">
          <img className="team-img" src={ryan} />
          <div className="team-info-description">Loves the mountains, snowboarding & all things cars</div>
        </div>

        <div className="team-position">
          <div className="team-name">Ryan Schabel</div>
          <div className="team-title">Full-Stack Developer</div>
        </div>

        <div className="github">
          <a href="https://github.com/schabel12" target="_blank"><img className="github-icon" src={github}/></a>
        </div>
      </div>
    </div>
  </div>
 ) 
}

export default LandingPageTeam