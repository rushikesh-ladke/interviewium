import {
  addDoc,
  doc,
  serverTimestamp,
  collection,
  updateDoc,
} from 'firebase/firestore';
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

export const createInterviewRound = async (data: any, values?: any) => {
  const roundsData = {
    HRComments: '',
    interviewerComments: '',
    intervieweeComments: '',
    status: STATUS.BOOKING,
    interviewerReview: '',
    interviewerVerdit: '',
    meetingLink: '',
    auditorId: data.auditorId,
    intervieweeId: data.intervieweeId,
    jobId: data.jobId,
    HRid: data.HRid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    interviewTimeAndDate: '',
  };

  const newRound = await await addDoc(collection(db, DOCUMENTS.ROUNDS), {
    ...roundsData,
  });
};
