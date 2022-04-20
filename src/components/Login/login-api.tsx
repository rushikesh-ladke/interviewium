import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import app, { auth, db } from 'shared/firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from 'firebase/firestore';
import 'firebase/firestore';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
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

  return signInWithPopup(auth, provider);
};

export const checkUserExist = async () => {
  const colRef: any = query(
    collection(db, 'users'),
    where('active', '==', true)
  );

  getDocs(colRef).then((e: any) => {
    console.log(e.docs);
    let a: any = [];

    e.docs.forEach((E: any) => {
      a.push({ ...E.data(), id: E.id });
    });
    console.log(a);
  });
};
