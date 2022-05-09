import { DOCUMENTS } from 'constants/firebase-docs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'shared/firebase-config';

export const addNewUserToDB = async (userId: any, email: any, role: any) => {
  const userData = {
    email,
    role,
  };

  const newUser = await setDoc(doc(db, DOCUMENTS.USERS, userId), userData);
  console.log(newUser);
};
