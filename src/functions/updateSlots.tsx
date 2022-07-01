import { doc, getDoc } from 'firebase/firestore';
import { DOCUMENTS } from '../constants/firebase-docs';
import { db } from '../shared/firebase-config';
import { updateDocument } from './updateDoc';

export const updateSlot = async (
  id: any,
  documentName: any,
  currentSlot: any
) => {
  //getSingleDocument
  const docRef: any = doc(db, documentName, id);
  const slotsData: any = await getDoc(docRef);
  if (slotsData.exists()) {
    const data = slotsData.data();
    let interviewSlotsData = JSON.parse(data.slots);
    const filterSlots = interviewSlotsData.slots.filter((e: any) => {
      if (e.slot === currentSlot && e.availability === 'booked') {
        return false;
      }
      return true;
    });

    interviewSlotsData = JSON.stringify({ slots: filterSlots });
    console.log(interviewSlotsData);
    updateDocument(DOCUMENTS.AUDITOR_SLOTS, id, {
      slots: interviewSlotsData,
    });
  } else {
    return {
      data: null,
      loaded: true,
      error: 'Something went Sideways',
    };
  }
};
