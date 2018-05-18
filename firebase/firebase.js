import * as firebase from 'firebase';

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
export const fbDb = firebase.database().ref('trips');
export default firebase;
