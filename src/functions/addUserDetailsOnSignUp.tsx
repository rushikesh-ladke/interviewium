import { doc, setDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';

export const addUserDetailsOnSignUp = async (userId: any, email: any) => {
  const userData = {
    email,
    onBoarded: false,
    active: true,
  };

  const newUser = await setDoc(doc(db, DOCUMENTS.USERS, userId), userData);
  console.log(newUser);
};
