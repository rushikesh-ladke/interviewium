import { doc, setDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';

export const postUserDetailsOnSignUp = async (
  userId: any,
  email: any,
  role: any,
  values?: any
) => {
  const userData = {
    email,
    role,
    ON_BOARDED: false,
    active: true,
    ...values,
  };

  const newUser = await setDoc(doc(db, DOCUMENTS.USERS, userId), userData);
  console.log(newUser);
};
