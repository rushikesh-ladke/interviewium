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
import { OVER_ALL_STATUS, STATUS } from '../../constants/status';

export const postAppliedJob = async (data: any, userId: any) => {
  await updateDoc(doc(db, DOCUMENTS.USERS, userId), {
    applyJob: arrayUnion(data),
  });
};

export const postInterviewDetails = async (data?: any) => {
  const docRef = await addDoc(collection(db, DOCUMENTS.INTERVIEWS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: STATUS.REQUEST,
    overAllStatus: OVER_ALL_STATUS.ONGOING_MAIN,
    active: true,
  });
};
