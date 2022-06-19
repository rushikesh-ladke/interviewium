import { setDoc, doc, arrayUnion } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { db } from '../../shared/firebase-config';

export const postAppliedJob = async (data: any, userId: any) => {
  await setDoc(doc(db, DOCUMENTS.USERS, userId), {
    applyJob: arrayUnion(data),
  });
};
