import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';
import { STATUS } from '../constants/status';

export const createInterviewRound = async (data: any) => {
  const roundsData = {
    ...data,
    HRComments: '',
    interviewerComments: '',
    intervieweeComments: '',
    status: STATUS.BOOKING,
    interviewerReview: '',
    interviewerVerdit: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    interviewTimeAndDate: '',
  };

  const round: any = await addDoc(collection(db, DOCUMENTS.ROUNDS), {
    ...roundsData,
  });
  console.log(round.id);
};
