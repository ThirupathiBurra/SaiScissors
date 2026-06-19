import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth'
import { app } from './client'

export const auth = getAuth(app)

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
}
