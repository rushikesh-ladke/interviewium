import { doc, getDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';
import { updateDocument } from './updateDoc';

export const postRoundDetailsToInterview = async (
  id: any,
  documentName: any,
  interviewDetails: any
) => {
  //getSingleDocument
  const docRef: any = doc(db, documentName, id);
  const interviewData: any = await getDoc(docRef);
  if (interviewData.exists()) {
    const data = interviewData.data();
    let interviewProcessData = JSON.parse(data.interviewProcessData);
    interviewProcessData = interviewData.map((e: any) => {
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
    updateDocument(DOCUMENTS.INTERVIEWS, 'dsa', {
      interviewProcessData: interviewProcessData,
    });
  } else {
    return {
      data: null,
      loaded: true,
      error: 'Something went Sideways',
    };
  }
};
