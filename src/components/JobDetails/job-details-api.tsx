import {
  doc,
  arrayUnion,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { db } from '../../shared/firebase-config';
import { STATUS } from '../../constants/status';

export const postAppliedJob = async (data: any, userId: any) => {
  await updateDoc(doc(db, DOCUMENTS.USERS, userId), {
    applyJob: arrayUnion(data),
  });
};

export const postInterviewDetails = async (data?: any) => {
  const docRef = await addDoc(collection(db, DOCUMENTS.INTERVIEW), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: STATUS.REQUEST,
    HRComments: '',
    active: true,
  });
};
