import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyDXZYp6nrvvlqTXCfcO61fcfDg6wVrPGIA",
  authDomain: "vue-firebase-6f2e8.firebaseapp.com",
  databaseURL: "https://vue-firebase-6f2e8.firebaseio.com", // firestore DB
  // databaseURL: "https://vue-firebase-6f2e8-default-rtdb.firebaseio.com", // Real-Time DB
  projectId: "vue-firebase-6f2e8",
  storageBucket: "vue-firebase-6f2e8.appspot.com",
  messagingSenderId: "1039405568601",
  appId: "1:1039405568601:web:73388790506f4918221748",
  measurementId: "G-VEN1W2MXNL"
}

const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore()

