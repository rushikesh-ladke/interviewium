import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../../shared/firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const popup = () => {
  const provider = new GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  auth.languageCode = 'it';
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  return signInWithPopup(auth, provider);
};

export const checkUserExist = async (userId: any) => {
  //@ref : query format
  // const colRef: any = query(collection(db, 'users'), where('id', '==', userId));
  const docRef: any = doc(db, 'users', userId);
  const userData: any = await getDoc(docRef);
  if (userData.exists()) {
    return userData.data();
  } else {
    console.log('No such document!');
  }
};
