const router = require('express').Router();
const db  = require('../database/index')

router.route('/users')
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