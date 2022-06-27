import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';
import { STATUS } from '../constants/status';

export const createInterviewRound = async (data: any) => {
  const roundsData = {
    ...data,
    interviewerComments: '',
    intervieweeComments: '',
    status: STATUS.BOOKING,
    interviewerReviewForHR: '',
    interviewerReviewForInterviewee: '',
    interviewerVerdict: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    interviewTimeAndDate: '',
    dispute: '',
    active: true,
  };

  const round: any = await addDoc(collection(db, DOCUMENTS.ROUNDS), {
    ...roundsData,
  });

  await updateDoc(doc(db, DOCUMENTS.INTERVIEWS, data.interviewId), {
    roundIds: arrayUnion(round.id),
    status: STATUS.BOOKING,
    updatedAt: serverTimestamp(),
    ongoingRoundData: data.ongoingRoundData,
  });
};
