import React from 'react'
import github from '../styles/img/github.png'
import brian from '../styles/img/brian.jpg'
import david from '../styles/img/david.jpg'

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
          <img className="team-img" src="https://avatars0.githubusercontent.com/u/12095864?s=460&v=4" />
          <div className="team-info-description">Loves samoyeds, the great outdoors, and LINE stickers</div>
        </div>

        <div className="team-position">
          <div className="team-name">Heidi Poon</div>
          <div className="team-title">Product Lead | Full-Stack Developer</div>
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
          <img className="team-img" src="https://avatars3.githubusercontent.com/u/35786667?s=460&v=4" />
          <div className="team-info-description">Loves BEING A STRAIGHT UP G</div>
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
          <img className="team-img" src="https://avatars1.githubusercontent.com/u/34013422?s=460&v=4" />
          <div className="team-info-description">Loves the mountains, snowboarding, & all things cars</div>
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