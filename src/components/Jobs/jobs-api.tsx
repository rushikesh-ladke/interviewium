import { db } from '../../shared/firebase-config';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

// Add a new document with a generated id.
interface createUpdateJobProps {
  disabled: boolean;
  published: boolean;
  active: boolean;
  companyDetails: {
    companyName: string;
    companyId: string;
  };
  department: string;
  HRDetails: {
    HRemail: string;
    HRid: string;
  };
  createdAt?: any;
  updatedAt: any;
  aboutJob: string;
  description: string;
  jobType: string;
  workspaceType: string;
  totalHiresRequired: string;
  location: string;
  position: string;
  minExp: string;
  maxExp: string;
  currency: string;
  salary: string;
  tenure: string;
  totalApplied: number;
  views: number;
}

export const createUpdateJob = async (data: any) => {
  const some1: createUpdateJobProps = {
    disabled: false,
    published: false,
    active: false,
    companyDetails: {
      companyName: data.companyName,
      companyId: data.companyId,
    },
    department: data.department,
    HRDetails: {
      HRemail: data.HREmail,
      HRid: data.HRid,
    },
    createdAt: data.createdAt,
    updatedAt: serverTimestamp(),
    aboutJob: data.aboutJob,
    description: data.description,
    jobType: data.jobType,
    workspaceType: data.workspaceType,
    location: data.location,
    totalHiresRequired: data.totalHiresRequired,
    position: data.position,
    minExp: data.minExp,
    maxExp: data.maxExp,
    currency: data.currency ? data.currency : '-',
    salary: data.salary ? data.salary : '-',
    tenure: data.tenure ? data.tenure : '-',
    totalApplied: 0,
    views: 0,
  };
  await addDoc(collection(db, 'jobs'), {
    ...some1,
  });
};

export const updateJob = async (data: any, id: any) => {
  const some1 = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  await updateDoc(doc(db, 'jobs', id), {
    ...some1,
  });
};
