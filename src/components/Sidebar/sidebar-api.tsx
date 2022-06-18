import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';

export const addInterviewerData = async (values: any, newDocId: any) => {
  const frankDocRef = doc(db, 'users', newDocId);
  await updateDoc(frankDocRef, {
    ...values,
    ON_BOARDED: true,
  });
  return;
};
