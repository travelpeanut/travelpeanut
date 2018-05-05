const router = require('express').Router();
const { addNewUser } = require('../database/index')
const axios = require('axios');

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


  module.exports = router;