const router = require('express').Router();
const db  = require('../database/index')
const { addNewUser } = require('../database/index')
const axios = require('axios');


router.route('/checkLogin')
.get((req, res) => {
  const {username, password} = req.query;
  db.checkLogin(username)
  .then((data) => {
    if (data.rowCount === 0) {
      console.log('username does not exist')
      res.sendStatus(401);
    } else if (data.rows[0].password !== password) {
      console.log('password does not match')
      res.sendStatus(401);
    } else {
      console.log('match')
      res.json(data.rows[0])
    };
  });
})


router.route('/checkLogin')
.get((req, res) => {
  const {username, password} = req.query;
  db.checkLogin(username)
  .then((data) => {
    if (data.rowCount === 0) {
      console.log('username does not exist')
      res.sendStatus(401);
    } else if (data.rows[0].password !== password) {
      console.log('password does not match')
      res.sendStatus(401);
    } else {
      console.log('match')
      res.json(data.rows[0])
    };
  });
})

router.route('/users')
  .get((req, res) => {
    const {username} = req.query
    db.getFirstNameByUsername(username)
    .then((data) => {
      res.json(data.rows[0])
    })
  })
  .post( (req, res) => {
    let newUser = req.body;
    console.log('going to add this user: ', newUser);
    db.addNewUser(newUser)
      .then( (response) => {
        let addedUser = response;
        console.log('added this user: ', addedUser);
        res.send(`Added User ${addedUser}`);
      })
      .catch( (err) => {
        console.log('did not add user: ', addedUser);
        res.send(err);
      })
  })

router.route('/home')
  .get()
  .post()
  .delete()

router.route('/trips')
  .get((req, res) => {
    db.getTripsByUser(req.query.userId)
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  })  
  .post( (req, res) => {
  })
  .delete((req, res) => {
    console.log(req.body.tripId)
    db.deleteTrip(req.body.tripId)
      .then(()=> {
        console.log('success in delete')
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err)
      })
  }) 
  
router.route('/newTrip')
  .post((req, res) => {
    let trip = req.body;        
    db.addTripToTrips(trip)
    .then((response) => {                
      res.send(response);
    })
    .catch((err) => {        
      res.send(err);
      })        
    })

router.route('/tripId')
  .get( (req, res) => {
    let owner = req.query.id;
    console.log('getting newly created trip for this owner: ', owner);
    db.getNewTripId(owner)
      .then((response) => {          
        let newTrip = response.rows[0];
        res.send(newTrip);
      })
      .catch((err) => {
        res.send(err)
      })
  })

router.route('/usersByTrips')
  .get()
  .post((req, res) => {
    let newTripId = req.body.newTripId
    let ownerId = req.body.ownerId
    console.log('in /usersByTrips. userId: ', ownerId)
    console.log('in /usersByTrips. newTripId: ', newTripId)

    db.addTripsByUser(ownerId, newTripId)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      })
  })
    

router.route('/discover')
  .get()
  .post()
  .delete()


router.route('/discover')
  .get()
  .post()
  .delete()

router.route('/getCoordinates')
  .get((req, res)=>{
    console.log('in router.route getcoordinates')
    console.log('city and country are...', req.query[0])
    console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query[0]}&key=AIzaSyB0viycMhEqrmrdp841mv_wGEkHNGCrk_s`)
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query[0]}&key=AIzaSyB0viycMhEqrmrdp841mv_wGEkHNGCrk_s`)
    .then(data => {
      let cityData = {
        formattedName: data.data.results[0].formatted_address,
        coordinates: data.data.results[0].geometry.location,
        place_id: data.data.results[0].place_id
      }
      res.status(200).send(cityData)
      // console.log(data.data.results[0].formatted_address)
      // console.log(data.data.results[0].geometry.location)
      // console.log(data.data.results[0].place_id)
    })
    .catch(err => {
      console.log('couldnt get data:', err)
      res.status(400).send(err)
    })
  })


router.route('/trip/members')
  .get((req, res) => {
    const {tripId} = req.query
    db.getTripMembers(tripId)
    .then((data) => {
      res.json(data.rows)
    })
    .catch((err) => {
      res.sendStatus(400).send(err)
    })
  })
  .post((req, res) => {
    const {username, tripId} = req.body.params
    db.addMemberToTrip(username, tripId)
    .then((response => {
      res.sendStatus(201);
    }))
    .catch((err) => {
      res.status(400).send(err);
    })
  })
  .delete((req, res) => {
    let memberId = req.body.member.id
    let tripId = req.body.trip.trip_id    
    db.deleteTripMember(memberId, tripId)
      .then((response) => {
        console.log('response from deleting member: ', response);
        res.status(200).send(response)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })

router.route('/trip/members')
  .get((req, res) => {
    const {tripId} = req.query
    db.getTripMembers(tripId)
    .then((data) => {
      res.json(data.rows)
    })
    .catch((err) => {
      res.sendStatus(400).send(err)
    })
  })
  .post((req, res) => {
    const {username, tripId} = req.body.params
    db.addMemberToTrip(username, tripId)
    .then((response => {
      res.sendStatus(201);
    }))
    .catch((err) => {
      res.status(400).send(err);
    })
  })

  module.exports = router;