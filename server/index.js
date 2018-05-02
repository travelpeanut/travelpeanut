const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on: ', port);
});
