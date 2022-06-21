import { DOCUMENTS } from '../../constants/firebase-docs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';

export const addNewUserToDB = async (userId: any, email: any, role: any) => {
  const userData = {
    role,
  };

  const newUser = await updateDoc(doc(db, DOCUMENTS.USERS, userId), userData);
};
