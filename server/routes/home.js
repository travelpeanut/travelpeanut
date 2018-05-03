const homeRouter = require('express').Router();

homeRouter.route('/home')
  .get((req, res) => {
    // Get all trips for the user
    // Call helper functions
    // Send back the response
  })
  .post((req, res) => {
    // Allow user to add a new trip
    // Call helper functions
    // Send back the response
  })
  .delete((req, res) => {
    // Allow user to delete a trip
    // Call helper functions
    // Send back the response
  });

module.exports = homeRouter;
