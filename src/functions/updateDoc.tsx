import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../shared/firebase-config';

export const updateDocument = async (
  document: any,
  documentId: any,
  data: any
) => {
  await updateDoc(doc(db, document, documentId), {
    ...data,
  });
};
