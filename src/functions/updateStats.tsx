import { doc, getDoc, setDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { OVER_ALL_STATUS, STATUS } from '../constants/status';
import { db } from '../shared/firebase-config';
import { updateDocument } from './updateDoc';

export const updateStats = async (
  id: any,
  documentName: any,
  stats: any,
  status: any,
  lastRound: any
) => {
  //getSingleDocument
  const docRef: any = doc(db, documentName, id);
  const statsData: any = await getDoc(docRef);
  if (statsData.exists()) {
    const data = statsData.data();
    updateDocument(documentName, id, stats);
  } else {
    await setDoc(doc(db, documentName, id), stats);
  }
};
