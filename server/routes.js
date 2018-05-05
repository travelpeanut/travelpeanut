const router = require('express').Router();
const { addNewUser, addTripToTrips } = require('../database/index')

router.route('/users')
  .get()

  .post( (req, res) => {
    let newUser = req.body;
    console.log('going to add this user: ', newUser);
    addNewUser(newUser)
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
  .get()
  .post( (req, res) => {
    let trip = req.body;    
    console.log('adding this trip: ', trip);
    addTripToTrips(trip)
      .then( (response) => {        
        console.log('ADDED THIS TRIP: ', response)
        res.send(response);
      })
      .catch( (err) => {
        console.log('DID NOT ADD TRIP: ', err)
        res.send(err);
      })    
  })
  .delete() 

  router.route('/usersTrips')
    .get()
    .post( (req, res) => {
      console.log('trip_id and users_id: ', )
    })

  module.exports = router;