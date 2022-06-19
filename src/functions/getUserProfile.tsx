import { doc, getDoc } from 'firebase/firestore';
import { db } from '../shared/firebase-config';

export const getSingleDocument = async (id: any, documentName: any) => {
  //getSingleDocument
  const docRef: any = doc(db, documentName, id);
  const userData: any = await getDoc(docRef);
  if (userData.exists()) {
    return {
      data: userData.data(),
      loaded: true,
      error: null,
    };
  } else {
    return {
      data: null,
      loaded: true,
      error: 'User Profile doesnot Exists',
    };
  }
};
