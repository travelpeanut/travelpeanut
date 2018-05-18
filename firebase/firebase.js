import * as firebase from 'firebase';
import gapi from 'gapi-client';

const config = {
  apiKey: 'AIzaSyBCRrBpDOeycW-y13E3yEZrfhxt-6NX2Ck',
  authDomain: 'travelpeanut-26014.firebaseapp.com',
  databaseURL: 'https://travelpeanut-26014.firebaseio.com',
  projectId: 'travelpeanut-26014',
  storageBucket: 'travelpeanut-26014.appspot.com',
  messagingSenderId: '712830463027',

  clientId: '712830463027-cni4cud2aoiblkjhmob17qeoti0ts5ft.apps.googleusercontent.com',

  scopes: ['email',
  'profile',
  'https://www.googleapis.com/auth/calendar'
  ],

  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ]
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar')


// export const provider = new firebase.auth.GoogleAuthProvider();
export const fbDb = firebase.database().ref('trips');
export default firebase;

// auth.onAuthStateChanged(function(user) {
//   console.log('USERRRRRRRRR', user)
//   // Make sure there is a valid user object
//   if(user){
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://apis.google.com/js/api.js';
//     // Once the Google API Client is loaded, you can run your code
//     script.onload = function(e){
//      // Initialize the Google API Client with the config object
//      gapi.client.init({
//        apiKey: config.apiKey,
//        clientId: config.clientId,
//        discoveryDocs: config.discoveryDocs,
//        scope: config.scopes.join(' '),
//      })
//      // Loading is finished, so start the app
//      .then(function() {
//       console.log(user.getToken())
//       // Make sure the Google API Client is properly signed in
//       if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//         console.log('STILL SIGNEDDD INNNN')
//       } else {
//         firebase.auth().signOut(); // Something went wrong, sign out
//       }
//      })
//     }
//     // // Add to the document
//     // document.getElementsByTagName('head')[0].appendChild(script);  
//   }
// })