import { db } from '../../shared/firebase-config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

// Add a new document with a generated id.
interface createUpdateJobProps {
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
  jobDetails: {
    aboutJob: string;
    description: string;
  };
  jobType: string;
  workspaceType: string;
  totalHiresRequired: string;
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
    updatedAt: data.updatedAt,
    jobDetails: {
      aboutJob: data.aboutJob,
      description: data.description,
    },
    jobType: data.jobType,
    workspaceType: data.workspaceType,
    location: data.location,
    totalHiresRequired: data.totalHiresRequired,
    position: data.position,
    minExp: data.minExp,
    maxExp: data.maxExp,
    salary: {
      currency: data.currency ? data.currency : '-',
      salary: data.salary ? data.salary : '-',
      tenure: data.tenure ? data.tenure : '-',
    },
    totalApplied: 0,
    views: 0,
  };
  const docRef = await addDoc(collection(db, 'jobs'), {
    ...some1,
  });
};

export const updateJob = async (data: any, id: any) => {
  const some1: createUpdateJobProps = {
    active: true,
    companyDetails: {
      companyName: data.companyName,
      companyId: data.companyId,
    },
    department: data.department,
    HRDetails: {
      HRemail: data.HREmail,
      HRid: data.HRid,
    },
    updatedAt: data.updatedAt,
    jobDetails: {
      aboutJob: data.aboutJob,
      description: data.description,
    },
    jobType: data.jobType,
    workspaceType: data.workspaceType,
    location: data.location,
    position: data.position,
    totalHiresRequired: data.totalHiresRequired,
    minExp: data.minExp,
    maxExp: data.maxExp,
    salary: {
      currency: data.currency ? data.currency : '-',
      salary: data.salary ? data.salary : '-',
      tenure: data.tenure ? data.tenure : '-',
    },
    totalApplied: 0,
    views: 0,
  };
  const docRef = await updateDoc(doc(db, 'jobs', id), {
    ...some1,
  });
};
