const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();

// ====================
// Middleware
// ====================
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// ====================
// Server Routes
// ====================
app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server listening on: ', port);
});
