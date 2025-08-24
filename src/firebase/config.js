import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBA4e8J5bkdXm8AiZ2Al9vnVI_M2KE469M',
  authDomain: 'ecofresh-2690b.firebaseapp.com',
  projectId: 'ecofresh-2690b',
  storageBucket: 'ecofresh-2690b.firebasestorage.app',
  messagingSenderId: '172084272805',
  appId: '1:172084272805:web:9617cf7b0809526604b74c',
  measurementId: 'G-K2EJ1EBCYY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)

export default app
