//import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC1f0kIES7_ZCCiPr_gIpdDsFPpq9EP8UM",
  authDomain: "fir-crud-cd955.firebaseapp.com",
  databaseURL: "https://fir-crud-cd955-default-rtdb.firebaseio.com",
  projectId: "fir-crud-cd955",
  storageBucket: "fir-crud-cd955.appspot.com",
  messagingSenderId: "1025711885141",
  appId: "1:1025711885141:web:cff78add66d4528f86bddc"
};



// initializeApp(firebaseConfig);
// //firebase.analytics();
// export default firebase;


export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return firebaseConfig;
  }
}

