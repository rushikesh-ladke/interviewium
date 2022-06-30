import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '../env/env.prod';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
const app: any = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db: any = getFirestore(app);
export default app;
