import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD-dLkzezI2-2SLgmG93_Z7dK3i6Kwy964",
  authDomain: "weshare-dk.firebaseapp.com",
  projectId: "weshare-dk",
  storageBucket: "weshare-dk.firebasestorage.app",
  messagingSenderId: "1064046932624",
  appId: "1:1064046932624:ios:e39636f8320b2271a31e15"
}

function getFirebaseApp(): FirebaseApp {
  if (getApps().length) return getApp()
  return initializeApp(firebaseConfig)
}

let _db: Firestore | null = null
let _auth: Auth | null = null

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseApp())
  return _db
}

export function getAuthInstance(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp())
  return _auth
}
