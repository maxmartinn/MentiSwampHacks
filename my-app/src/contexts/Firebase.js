import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBkmNvtzW3rlMkszUze6W1ZYWWUhoDtCV0',
  authDomain: 'mentalhealthwebsite-84cd2.firebaseapp.com',
  projectId: 'mentalhealthwebsite-84cd2',
  storageBucket: 'mentalhealthwebsite-84cd2.appspot.com',
  messagingSenderId: '554470423501',
  appId: '1:554470423501:web:d1feb0f675158835a96284',
  measurementId: 'G-6Q3RVKMVPY',
});

export const db = firebase.firestore();
export const auth = app.auth();
export default app;
