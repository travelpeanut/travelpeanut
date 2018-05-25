## TravelPeanut
A web application to help organize a trip itinerary for group travelers. 

## Motivation
TravelPeanut was built buy a group of students at Hack Reactor. The concept was to create an application to easily collaborate among a group to create a trip itinerary.
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used

<b>Built with</b>
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React-Redux](https://redux.js.org/basics/usage-with-react)
- [PostgreSQL](https://postgresql.org)
- [Firebase](https://firebase.google.com/)
- [npm](https://www.npmjs.com/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Axios](https://www.npmjs.com/package/axios)

## Features
Travelers will be able to: 
 * Send email invitations to new users for thier trip
 * Add activities to an itinerary
 * Browse nearby places by type
 * View a map of nearby places
 * Update the itinerary
 * Vote on activities in an itinerary
 * Comment on any activity
 * Communicate with trip members in a live chat
 * Export the itinerary to Google Calendar 

## Code Example
Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Installation

Fork to your local repository.

Clone to your local machine:
```
git clone https://github.com/https://github.com/travelpeanut/travelpeanut.git/travelpeanut/tree/master
```

Install [node.js](https://nodejs.org/en/download/) if not installed.

in the root directory, run:
```
npm install
```

Once the packages are finishd installing, create a config.js file and save it to the root directory:
```
module.exports = {
  TOKEN: '',
  HOST: '{location ofpostgreSQL db pool}',
  USER: '{pg user name}',
  PASSWORD: '{pg password}',
  DATABASE: '{pg database name}',
  PORT: '{port of your choice (usually 5432)',
  sgAPI: '{SendGrid API Key}',
  unsplashAPI: '{unsplash API Key}',
  GOOGLE_PLACES: '{Google Maps API Key}',
  CLIENT_ID: '{clientID address for google OAuth}"',
  CLIENT_SECRET: '{client secret for google OAuth}',
  PROJECT_ID: '{project id}',
  AUTH_URI:'https://accounts.google.com/o/oauth2/auth',
  REDIRECT_URIS: ['{******something about redirecting}','http://localhost'],
  TOKEN_URI: 'https://accounts.google.com/o/oauth2/token',
  AUTH_PROVIDER_X509_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
  YELP_CLIENT_ID: '{yelp client id}',
  YELP_API_KEY: '{yelp API Key}'
};
```

In one terminal window, run:
```
npm run server-dev
```

In a second another terminal window, run:
```
npm run react-dev
```

Open localhost:3000/ in your browser and start using the application!


## API Reference

- [Yelp](https://www.yelp.com/developers/documentation/v3/business)
- [Google Maps](https://cloud.google.com/maps-platform/)
- [Google Auth](https://developers.google.com/identity/protocols/OAuth2)
- [Firebase](https://firebase.google.com/)
- [SendGrid](https://sendgrid.com/docs/API_Reference/api_v3.html)
- [unsplash](https://unsplash.com/developers)

## Authors
* [David Baek](https://github.com/davidbaek92)
* [Brian Fang](https://github.com/bfang212)
* [Heidi Poon](https://github.com/heidixpoon)
* [Ryan Schabel](https://github.com/schabel12)


#### Anything else that seems useful
