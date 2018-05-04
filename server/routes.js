const router = require('express').Router();
const {selectAllUsers, selectAllTrips} = require('../database/index')

router.route('/users')
  .get( (req, res) => {
    selectAllUsers()
      .then( (response) => {
        let users = response.rows;
        console.log('GET/users: ', users);
        res.send(users);
      })
      .catch( (err) => {
        console.log('ERROR GET/users: ', err);
        res.send(err)
      })
    })
    .post( () => {

    })

router.route('/home')
  .get()
  .post()
  .delete()

  router.route('/trips')
  .get( (req, res) => {
    selectAllTrips()
      .then( (response) => {
        let trips = response.rows;
        console.log('GET/trips: ', trips);
        res.send(trips);
      })
      .catch( (err) => {
        console.log('ERROR GET/trips: ', err);
        res.send(err)
      })
  })
  .post()
  .delete() 

  module.exports = router;