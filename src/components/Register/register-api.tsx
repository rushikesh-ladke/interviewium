import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';

// Add a new document with a generated id.

export const saveCompanyData = async (data: any) => {
  const docRef = await addDoc(collection(db, 'companyDocuments'), {
    companyName: data.companyName,
    headHRDetails: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });
  console.log('Document written with ID: ', docRef.id);
};
