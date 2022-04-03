import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'shared/firebase-config';

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
