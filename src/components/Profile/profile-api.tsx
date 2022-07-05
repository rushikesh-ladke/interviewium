import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';

export const addProfileData = async (values: any, newDocId: any) => {
  const profileDataRef = doc(db, 'users', newDocId);
  await updateDoc(profileDataRef, {
    profile: {
      firstName: values.firstName,
      lastName: values.lastName,
      contact: values.contact,
      location: values.location,
    },
    links: {
      linkedin: values.linkedinURL,
      meetingLink: values.meetingLink ? values.meetingLink : '',
    },
    currentPosition: values.position,
    ON_BOARDED: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return;
};
