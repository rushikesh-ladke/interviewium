import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { db } from '../../shared/firebase-config';
import { STATUS } from '../../constants/interview-status';

export const assignHandler = async (interviewId: any, autditorId: any) => {
  await updateDoc(doc(db, DOCUMENTS.INTERVIEW, interviewId), {
    autditorId: autditorId,
    status: STATUS.ONGOING,
    updatedAt: serverTimestamp(),
  });
};
