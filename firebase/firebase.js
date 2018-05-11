import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBCRrBpDOeycW-y13E3yEZrfhxt-6NX2Ck",
  authDomain: "travelpeanut-26014.firebaseapp.com",
  databaseURL: "https://travelpeanut-26014.firebaseio.com",
  projectId: "travelpeanut-26014",
  storageBucket: "travelpeanut-26014.appspot.com",
  messagingSenderId: "712830463027"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const fbDb = firebase.database().ref('trips')

export default firebase;
