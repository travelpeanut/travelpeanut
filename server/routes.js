const router = require('express').Router();
const db = require('../database/index');
const { addNewUser } = require('../database/index');
const axios = require('axios');
const { sgAPI, unsplashAPI } = require('../config.js');
const { API, GOOGLE_PLACES } = require('../config.js');
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS} = require('../config.js')
const sgMail = require('@sendgrid/mail');
const _ = require('underscore');
const {google} = require('googleapis');
const calendar = google.calendar('v3');
const moment = require('moment')

router.route('/login')
  .get((req, res) => {
  // console.log(req.query)
    const userInfo = req.query;
    // let token = req.query['0']
    db.checkLogin(userInfo.email)
      .then((data) => {
        console.log('db back', data);
        if (data.rowCount === 0) {
        // console.log('hi new user!!!!')
        // query insert new data
          return db.addNewUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.uid);
        }
        // console.log('matched', data.rows[0])
        // res.json(data.rows[0])
        // res.status(200).send('user exists, login success')
        return data;
      })
      .then((data) => {
      // console.log('response', data)
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
    // console.log('going to add this user: ', newUser);
    db.addNewUser(newUser)
      .then((response) => {
        const addedUser = response;
        // console.log('added this user: ', addedUser);
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
    Promise.all(req.query[0].map(type => axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query[1]},${req.query[2]}&radius=1500&type=${type}&key=${GOOGLE_PLACES}`)))
      .then((places) => {
        const placeData = places.map(received => received.data.results);
        let outArr = [];
        for (let i = 0; i < placeData.length; i++) {
          outArr = outArr.concat(placeData[i]);
        }
        outArr = _.uniq(outArr, false, place => place.id);
        outArr.sort((a,b) => {
          return b.rating - a.rating
        });
        let results = outArr.slice(0,9)
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log('couldnt get all places in server:', err);
        res.status(400).send(err);
      });
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
    const { userId, tripId } = req.query;
    db.getPendingInvites(userId, tripId)
      .then((data) => {
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
        const msg = {
          to: toEmail,
          from: email,
          subject: 'Message from Travel Peanut',
          text: `${firstName} has invited you to a magical journey`,
          html: `<img src=${imgUrl} /> <br></br> Photo by <a href="https://unsplash.com/@${data.data.results[0].user.username}?utm_source=travel_peanut">${data.data.results[0].user.name}</a> on <a href="https://unsplash.com/?utm_source=travel_peanut&">Unsplash</a>`,
        };
        sgMail.send(msg);
        db.saveInvite(toEmail, trip_id, owner_id)
          .then((response) => {
            res.status(201).send(response);
          })
          .catch((err) => {
            console.error(err);
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
  });


router.route('/updateActivity')
  .post((req, res) => {
    let {id, startTime, newActivityName} = req.body.params
    db.updateActivity(id, startTime, newActivityName)
    .then((success) => {
      res.status(200).send(success)
    })
    .catch(err => {
      console.error('couldnt update activity:', err)
      res.status(400).send(err)
    })
  })
  .delete((req, res) => {
    db.deleteActivity(req.query.id)
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

  router.route('/upVoteActivity')
    .post((req, res) => {
      let {activityId, userId, tripId} = req.body.params
      db.upVoteActivity(activityId, userId, tripId)
      .then((success) => {
        res.status(200).send(success)
      })
      .catch(err => {
        console.error('couldnt update activity votes:', err)
        res.status(400).send(err)
      })
    })

  router.route('/downVoteActivity')
  .post((req, res) => {
    let {activityId, userId, tripId} = req.body.params
    db.upVoteActivity(activityId, userId, tripId)
    .then((success) => {
      res.status(200).send(success)
    })
    .catch(err => {
      console.error('couldnt update activity votes:', err)
      res.status(400).send(err)
    })
  })

  router.route('/getVotes')
  .get((req,res) => {
    let {tripId} = req.query
    db.getvotes
  })

module.exports = router;
