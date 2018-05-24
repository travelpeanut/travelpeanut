const router = require('express').Router();
const db = require('../database/index');
const { addNewUser } = require('../database/index');
const axios = require('axios');
const { sgAPI, unsplashAPI } = require('../config.js');
const { API, GOOGLE_PLACES } = require('../config.js');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS, YELP_API_KEY} = require('../config.js')
const sgMail = require('@sendgrid/mail');
const _ = require('underscore');
const {google} = require('googleapis');
const calendar = google.calendar('v3');
const moment = require('moment')
const {template} = require('./emailTemplate');

router.route('/login')
  .get((req, res) => {
    const userInfo = req.query;
    db.checkLogin(userInfo.email)
      .then((data) => {
        if (data.rowCount === 0) {
          return db.addNewUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.uid);
        }
        // console.log('matched', data.rows[0])
        // res.json(data.rows[0])
        // res.status(200).send('user exists, login success')
        return data;
      })
      .then((data) => {
        res.status(200).send({ userId: data.rows[0].id });
      })
      .catch((err) => {
        console.error(err);
      });
  });

router.route('/users')
  .get((req, res) => {
    const { username } = req.query;
    db.getFirstNameByUsername(username)
      .then((data) => {
        res.json(data.rows[0]);
      });
  })
  .post((req, res) => {
    const newUser = req.body;
    db.addNewUser(newUser)
      .then((response) => {
        const addedUser = response;
        res.send(`Added User ${addedUser}`);
      })
      .catch((err) => {
        console.error('did not add user: ', err);
        res.send(err);
      });
  });

router.route('/home')
  .get()
  .post()
  .delete();


router.route('/trips')
  .get((req, res) => {
    db.getTripsByUser(req.query.userId)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
  })
  .delete((req, res) => {
    // console.log(req.body.tripId)
    db.deleteTrip(req.body.tripId)
      .then(() => {
        // console.log('success in delete')
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/newTrip')
  .post((req, res) => {
    const trip = req.body;
    db.addTripToTrips(trip)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/tripId')
  .get((req, res) => {
    const owner = req.query.id;
    // console.log('getting newly created trip for this owner: ', owner);
    db.getNewTripId(owner)
      .then((response) => {
        const newTrip = response.rows[0];
        res.send(newTrip);
      })
      .catch((err) => {
        res.send(err);
      });
  });

router.route('/usersByTrips')
  .get()
  .post((req, res) => {
    const { newTripId, ownerId } = req.body;

    db.addTripsByUser(ownerId, newTripId)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  });


router.route('/discover')
  .get()
  .post()
  .delete();

router.route('/getCoordinates')
  .get((req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query[0]}&key=${GOOGLE_PLACES}`)
      .then((data) => {
        const cityData = {
          formattedName: data.data.results[0].formatted_address,
          coordinates: data.data.results[0].geometry.location,
          place_id: data.data.results[0].place_id,
        };
        res.status(200).send(cityData);
      })
      .catch((err) => {
        console.log('couldnt get data:', err);
        res.status(400).send(err);
      });
  });

router.route('/getNearbyPlacesByType')
  .get((req, res) => {    
    const searchQuery = req.query.types
    const searchLocation = req.query.location
    const url = `https://api.yelp.com/v3/businesses/search?term=${searchQuery}&location=${searchLocation}&sort_by=rating&limit=15`    
    const options = {
      headers: {
        Authorization: YELP_API_KEY
      }
    }

    axios.get(url, options)
      .then(({data}) => {        
        res.send(data.businesses)
      })
      .catch((err) => {
        console.error('err from yelp: ', err)
      })    
  });

router.route('/trip/members')
  .get((req, res) => {
    const { tripId } = req.query;
    db.getTripMembers(tripId)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.sendStatus(400).send(err);
      });
  })
  .post((req, res) => {
    const { userId, tripId } = req.body.params;
    db.addMember(userId, tripId)
      .then((() => {
        res.sendStatus(201);
      }))
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    const { memberId, tripId } = req.body;
    db.deleteTripMember(memberId, tripId)
      .then((response) => {
        res.status(202).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/trip/invite')
  .get((req, res) => {
    const { tripId } = req.query;
    db.getPendingInvites(tripId)
      .then((data) => {
        console.log('get response', data)
        res.json(data.rows);
      });
  })
  .post((req, res) => { 
    sgMail.setApiKey(sgAPI);
    const {
      toEmail, trip_id, owner_id, email, firstName, city,
    } = req.body.params;

    axios.get(`https://api.unsplash.com/search/photos/?query=${city}&client_id=${unsplashAPI}`)
      .then((data) => {
        const imgUrl = data.data.results[0].urls.small;
        const msg = template(toEmail, email, firstName, imgUrl, city)
        sgMail.send(msg);
        db.saveInvite(toEmail, trip_id, owner_id)
          .then((response) => {
            res.status(201).send(response);
          })
          .catch((err) => {
            console.error('ERROR!!!', err);
          });
      });
  })
  .delete((req, res) => {
    const { email, tripId } = req.query;
    db.deleteInvite(email, tripId)
      .then(() => {
        res.sendStatus(202);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/invitations')
  .get((req, res) => {
    const { email } = req.query;
    db.getInvitations(email)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    const { email, tripId } = req.query;
    db.deleteInvitation(email, tripId)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/activities')  
  .get((req, res) => {
    const { tripId, activityDate} = req.query
    db.getActivites(tripId, activityDate)
      .then((activities) => {
        res.status(200).send(activities);
      })
      .catch((err) => {
        console.error('couldnt get activities:', err);
        res.status(400).send(err);
      });
  })
  .post((req, res) => {
    let {tripId, activityDate, startTime, activityName} = req.body.params    
    db.addActivity(tripId, activityDate, startTime, activityName)
      .then((success) => {
        res.status(200).send(success);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .patch((req, res) => {
    const {activityId, activityName, startTime} = req.body.params
    db.updateActivity(activityId, activityName, startTime)
    .then((success) => {
      res.status(200).send(success)
    })
    .catch(err => {
      console.error('couldnt update activity:', err)
      res.status(400).send(err)
    })
  })
  .delete((req, res) => {
    const {activityId} = req.query
    db.deleteActivity(activityId)
      .then((success) => {
        res.status(200).send(success)
      })
      .catch(err => {
        console.error('couldnt delete in route:', err)
        res.status(400).send(err)
      })
  })


router.route('/itinerary')
  .post((req, res) => {
    const {accessToken, tripId, city} = req.body.params
    console.log(req.body.params)
    let oauth = new google.auth.OAuth2(
      CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS[0]);
    oauth.setCredentials({access_token: accessToken});
    //make a database call to pull the activities
    db.getAllActivities(tripId)
    .then(({rows}) => {
      const EventsToExport = []
      rows.forEach((activity, i) => {
        const hour = moment(activity.start_time, 'hh:mm:ss').hour()
        const minute = moment(activity.start_time, 'hh:mm:ss').minute()
        let resource = {
          "summary": activity.description,
          "location": city, 
          "start": {
            "dateTime": moment(activity.date_of_activity, 'YYYY-MM-DD').toDate()
            // 'dateTime': '2018-05-28T17:00:00',
            // 'timeZone': 'America/Los_Angeles'
          },
          "end": {
            // 'dateTime': '2018-05-28T18:00:00',
            // 'timeZone': 'America/Los_Angeles'
            "dateTime": moment(activity.date_of_activity, 'YYYY-MM-DD').hour(hour).minute(minute).toDate()
          }
        }
        EventsToExport.push(calendar.events.insert({
          'calendarId': 'primary',
          'auth': oauth,
          'resource': resource
        }))
        Promise.all(EventsToExport)
      })
    })
    .then(() => res.sendStatus(201))
    .catch((error) => res.sendStatus(400))
    // let resource = {
    //     "summary": "Appointment",
    //     "location": "Somewhere",
    //     "start": {
    //       'dateTime': '2018-05-28T17:00:00',
    //       'timeZone': 'America/Los_Angeles'              
    //     },
    //     "end": {
    //       'dateTime': '2018-05-28T18:00:00',
    //       'timeZone': 'America/Los_Angeles'
    //     }
    //   };
})
  
  router.route('/votes')
    .get((req,res) => {
      const { activityId} = req.query
      db.getVotesForActivity(activityId)
     .then((data) => {
        res.status(200).send(data)
     })
      .catch(err => {
        console.log('couldnt get response from db:', err)
      })
   })
    .post((req, res) => {
     const {activityId, userId, tripId, vote} = req.body.params
     console.log(activityId, userId, tripId, vote)
     db.voteActivity(activityId, userId, tripId, vote)
     .then((success) => {
       res.status(200).send(success)
     })
      .catch(err => {
       console.error('couldnt update activity votes:', err)
       res.status(400).send(err)
     })
   })
  
  router.route('/reviews')
    .get((req, res) => {                  
      
      const id = req.query.id
      const options = {
        headers: {
          Authorization: YELP_API_KEY
        }
      }

      const url = `https://api.yelp.com/v3/businesses/${id}/reviews`

      axios.get(url, options)
        .then(({data}) => {
          console.log('data from yelp review search: ', data)
          res.send(data)
        })
        .catch((err) => {
          console.error('could not get yelp review: ', err)
          res.end()
        })


    })

module.exports = router;
