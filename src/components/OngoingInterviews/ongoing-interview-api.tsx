import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { db } from '../../shared/firebase-config';

export const updateStatus = async (data: any, id: any) => {
  await updateDoc(doc(db, DOCUMENTS.INTERVIEWS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};
