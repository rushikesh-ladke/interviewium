import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from 'shared/firebase-config';

// Add a new document with a generated id.

interface createUpdateJobProps {
  active: boolean;
  companyName: string;
  department: string;
  details: {
    HRemail: string;
    HRid: string;
    createdAt: any;
    updatedAt: any;
  };
  jobDetails: {
    aboutJob: string;
    description: string;
  };
  jobType: string;
  location: string;
  position: string;
  salary: {
    currency: string;
    salary: string;
    tenure: string;
  };
  totalApplied: number;
  views: number;
}

export const createUpdateJob = async (data: any) => {
  const some1: createUpdateJobProps = {
    active: true,
    companyName: data.companyName,
    department: data.department,
    details: {
      HRemail: data.HREmail,
      HRid: data.HRid,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    },
    jobDetails: {
      aboutJob: data.aboutJob,
      description: data.description,
    },
    jobType: data.jobType,
    location: data.location,
    position: data.position,
    salary: {
      currency: data.currency,
      salary: data.salary,
      tenure: data.tenure,
    },
    totalApplied: 0,
    views: 0,
  };
  const docRef = await addDoc(collection(db, 'jobs'), {
    ...some1,
  });
  console.log('Document written with ID: ', docRef.id);
};

export const getJobs = (userId: any) => {
  const q = query(
    collection(db, 'jobs'),
    where('active', '==', true),
    where('details.HRid', '==', userId)
  );

  getDocs(q).then(snapshot => {
    const jobs: any = [];
    snapshot.forEach(doc => {
      jobs.push(doc.data());
    });
    console.log(jobs);
    return jobs;
  });
  // await onSnapshot(q, querySnapshot => {
  //   const jobs: any = [];
  //   querySnapshot.forEach(doc => {
  //     jobs.push(doc.data());
  //   });
  //   return jobs;
  // });
};
