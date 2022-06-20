import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';
import { STATUS } from '../constants/status';
import { getSingleDocument } from './getUserProfile';

export const createInterviewRound = async (data: any, values?: any) => {
  let meetingLink = '';
  const profile: any = await getSingleDocument(data.auditorId, DOCUMENTS.USERS);
  if (profile.loaded && profile.error === null) {
    meetingLink = profile.data.links.meetingLink;
  }

  const roundsData = {
    HRComments: '',
    interviewerComments: '',
    intervieweeComments: '',
    status: STATUS.BOOKING,
    interviewerReview: '',
    interviewerVerdit: '',
    meetingLink: meetingLink, //
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
