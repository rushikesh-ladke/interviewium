import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from 'shared/firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const popup = () => {
  const provider = new GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  auth.languageCode = 'it';
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  signInWithPopup(auth, provider);
};
