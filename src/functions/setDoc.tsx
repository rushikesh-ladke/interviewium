import { doc, setDoc } from 'firebase/firestore';
import { db } from '../shared/firebase-config';

export const createDocument = async (
  document: any,
  documentId: any,
  data: any
) => {
  await setDoc(doc(db, document, documentId), data);
};
