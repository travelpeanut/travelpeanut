import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from './fbConfig.js'

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar')
export const fbDb = firebase.database().ref('trips');
export default firebase;
