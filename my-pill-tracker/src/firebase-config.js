import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBb6dDUsfQUdNBE2mcrWsVrK3G5Uk6HlYg",
    authDomain: "mypilltracker-12bd4.firebaseapp.com",
    projectId: "mypilltracker-12bd4",
    storageBucket: "mypilltracker-12bd4.appspot.com",
    messagingSenderId: "999304637894",
    appId: "1:999304637894:web:558867313933cca67fd6c7"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);