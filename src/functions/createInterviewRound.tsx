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
    interviewerReview: '',
    interviewerVerdict: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    interviewTimeAndDate: '',
  };

  const round: any = await addDoc(collection(db, DOCUMENTS.ROUNDS), {
    ...roundsData,
  });
  console.log(round.id);

  await updateDoc(doc(db, DOCUMENTS.INTERVIEWS, data.interviewId), {
    roundIds: arrayUnion(round.id),
    status: STATUS.ONGOING,
    updatedAt: serverTimestamp(),
  });
};
