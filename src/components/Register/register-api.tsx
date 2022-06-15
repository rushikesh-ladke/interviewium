import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../shared/firebase-config';

// Add a new document with a generated id.

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const saveCompanyData = async (data: any) => {
  try {
    const signInData = await signUp(data.email, data.password);
    const { user }: any = signInData;
    console.log(user);
    const docRef = await addDoc(collection(db, 'companyDocuments'), {
      companyName: data.companyName,
      headHRDetails: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    console.log('Document written with ID: ', docRef.id);
    return {
      alert: 'success',
      message: 'Signed In',
      doc: docRef.id,
      user: user,
    };
  } catch (error: any) {
    console.error(error.customData._tokenResponse.error.message);
    return {
      alert: 'error',
      message: error.customData._tokenResponse.error.message,
      doc: '',
      user: '',
    };
  }
};

export const addAditionalData = async (values: any, newDocId: any) => {
  const frankDocRef = doc(db, 'companyDocuments', newDocId);
  await updateDoc(frankDocRef, {
    ...values,
  });
  return;
};
