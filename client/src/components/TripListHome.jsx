import React from 'react'
import moment from 'moment'

const TripListHome = ({allTrips, goToTrip, currentUserId, deleteTrip}) => {
  return (
    <div>
      {
        allTrips.map((item, i) => {
          let startDate = moment(item.start_date).calendar();
          let endDate = moment(item.end_date).calendar();

          return (

            <div className="c-tripHome" key={i}>
              <div className="grid">
                <div className="row">
                  <div className="col col-2-of-4">
                    <img src="https://images.unsplash.com/photo-1446038202205-1c96430dbdab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8bc8829ca2d952a157c651e7cb5facc9&auto=format&fit=crop&w=2849&q=80" alt=""/>
                  </div>
                  <div className="col col-2-of-4">
                    <div className="c-tripHome-content">
                      <h3>{item.title}</h3>
                      <span className="c-tripHome-location">{item.city}, {item.country}</span>
                      <p>{startDate} - {endDate}</p>
                      <button className="btn-tran draw-border" onClick={()=> goToTrip(item)}>Go to Trip</button>
                      {item.owner_id === currentUserId ? 
                        <button className="btn-tran draw-border" onClick={() => deleteTrip(item.trip_id)}>Delete</button>
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }) 
              
      }

    </div>
  )
}

export default TripListHome