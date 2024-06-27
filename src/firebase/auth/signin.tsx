import { getAuth, Auth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
import firebase_app from './config';

const auth = getAuth(firebase_app);

export default async function signInWithEmailAndPassword(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
}
