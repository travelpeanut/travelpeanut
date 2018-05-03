const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/home.js');
const db = require(path.join(__dirname + '../database/index.js'));

const app = express();

// ====================
// Middleware
// ====================
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// ====================
// Server Routes
// ====================
app.use('/api', homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on: ', port);
});
