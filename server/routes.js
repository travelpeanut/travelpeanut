const router = require('express').Router();
const { addNewUser } = require('../database/index')

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
  .post()
  .delete() 

  module.exports = router;