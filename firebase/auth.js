import {auth, provider} from './firebase.js'

// signInWithPopup
export const signInWithPopup = () => 
  auth.signInWithPopup(provider) 


