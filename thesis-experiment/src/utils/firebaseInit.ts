import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDeo-uWuMSReFVzjCpdBRYAzveuHk-mnQg',
  authDomain: 'thesis-experiment.firebaseapp.com',
  projectId: 'thesis-experiment',
  storageBucket: 'thesis-experiment.appspot.com',
  messagingSenderId: '101734678899',
  appId: '1:101734678899:web:634dfdc3e30834919d8506',
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()
export default db
