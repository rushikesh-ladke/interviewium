import { doc, getDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { OVER_ALL_STATUS, STATUS } from '../constants/status';
import { db } from '../shared/firebase-config';
import { updateDocument } from './updateDoc';

export const postRoundDetailsToInterview = async (
  id: any,
  documentName: any,
  interviewDetails: any,
  status: any,
  lastRound: any
) => {
  //getSingleDocument
  const docRef: any = doc(db, documentName, id);
  const interviewData: any = await getDoc(docRef);
  if (interviewData.exists()) {
    const data = interviewData.data();
    let interviewProcessData = JSON.parse(data.interviewProcessData);
    interviewProcessData.rounds = interviewProcessData.rounds.map((e: any) => {
      if (e.round === data.ongoingRoundData) {
        return {
          ...e,
          ...interviewDetails,
        };
      } else {
        return e;
      }
    });
    interviewProcessData = JSON.stringify(interviewProcessData);

    let ongoingRoundData;
    let lastRound = false;
    if (data.totalInterviewRounds !== data.ongoingRoundData + 1) {
      ongoingRoundData = data.ongoingRoundData + 1;
    } else {
      ongoingRoundData = data.totalInterviewRounds;
      lastRound = true;
    }

    if (status === STATUS.ASSIGN) {
      updateDocument(DOCUMENTS.INTERVIEWS, id, {
        interviewProcessData: interviewProcessData,
        status: status,
        ongoingRoundData: ongoingRoundData,
        lastRound: lastRound,
      });
    } else if (status === STATUS.REJECTED) {
      updateDocument(DOCUMENTS.INTERVIEWS, id, {
        interviewProcessData: interviewProcessData,
        status: status,
        overAllStatus: OVER_ALL_STATUS.COMPLETED_MAIN,
        lastRound: lastRound,
      });
    } else if (status === STATUS.OFFERED && lastRound) {
      updateDocument(DOCUMENTS.INTERVIEWS, id, {
        interviewProcessData: interviewProcessData,
        status: status,
        ongoingRoundData: ongoingRoundData,
        lastRound: lastRound,
      });
    }
  } else {
    return {
      data: null,
      loaded: true,
      error: 'Something went Sideways',
    };
  }
};
