import firebase_app from './config';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  } catch (error) {
    throw error;
  }
}
