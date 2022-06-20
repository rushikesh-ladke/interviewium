import { db } from '../../shared/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

// Add a new document with a generated id.
interface createUpdateJobProps {
  active: boolean;
  companyName: string;
  companyId: string;
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
  workspaceType: string;
  location: string;
  position: string;
  minExp: string;
  maxExp: string;
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
    companyId: data.companyId,
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
    workspaceType: data.workspaceType,
    location: data.location,
    position: data.position,
    minExp: data.minExp,
    maxExp: data.maxExp,
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
};
