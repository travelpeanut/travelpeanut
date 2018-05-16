import React from 'react'

const TripListHome = ({allTrips, goToTrip, currentUserId, deleteTrip}) => {
  return (
    <div>
      {
        allTrips.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.title}</p>
              <p>{item.city}</p>
              <p>{item.country}</p>              
              <button onClick={()=> goToTrip(item)}>Go to Trip</button>
              {item.owner_id === currentUserId ? 
                <button onClick={() => deleteTrip(item.trip_id)}>Delete</button>
                : ''
              }
            </div>
          )
        }) 
              
      }

    </div>
  )
}

export default TripListHome