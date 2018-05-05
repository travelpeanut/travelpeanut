const router = require('express').Router();
const db  = require('../database/index')

router.route('/users')
  .get()

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
  .post()
  .delete() 

  module.exports = router;