const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/home.js');
const {selectAllTrips} = require('../database/index.js');

const app = express();

// ====================
// Middleware
// ====================
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// ====================
// Server Routes
// ====================
  app.get('/test', (req, res) => {
    console.log('getting all trips')
    selectAllTrips()
      .then( (results) => {
        let trips = results.rows;
        console.log('trips: ', trips)
        res.send(trips);
      })
      .catch( (err) => {
        console.log('err: ', err);
      })
  })




app.use('/api', homeRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on: ', port);
});
