const router = require('express').Router();
const {selectAllUsers} = require('../database/index')

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

router.route('/home')
  .get()
  .post()
  .delete()

  router.route('/trips')
  .get()
  .post()
  .delete() 

  module.exports = router;