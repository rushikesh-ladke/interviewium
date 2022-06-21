import * as React from 'react';
import styles from './styles.module.scss';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { STATUS } from '../../constants/status';
import useAuth from '../../hooks/useAuth';
import { db } from '../../shared/firebase-config';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import IntervieweeCard from './dnd/intervieweeCard';
import AuditorCard from './dnd/auditorCard';
import { assignHandler } from './assign-api';
import { createInterviewRound } from '../../functions/createInterviewRound';

export const Assign = () => {
  const [value, setValue] = React.useState(0);
  const { auth } = useAuth();
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);
  const [candidateAssign, setCandidateAssign] = React.useState<any>([]);
  const [auditorAssign, setAuditorAssign] = React.useState<any>([]);

  React.useEffect(() => {
    getCandidateToAssign();
    getAuditorToAssign();
  }, []);

  const getCandidateToAssign = async () => {
    const companyID = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEWS),
      where('active', '==', true),
      where('companyId', '==', companyID),
      where('status', '==', STATUS.ASSIGN)
    );

    const querySnapshot = await getDocs(q);
    const requests: any = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      requests.push({
        ...data,
        ...data.intervieweeDetails,
        id: doc.id,
      });
    });
    setCandidateAssign(requests);
  };

  const getAuditorToAssign = async () => {
    const companyID = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.USERS),
      where('active', '==', true),
      where('companyDetails.companyId', '==', companyID)
    );

    const querySnapshot = await getDocs(q);
    const requests: any = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      requests.push({
        ...data,
        ...data.intervieweeDetails,
        id: doc.id,
      });
    });
    setAuditorAssign(requests);
  };

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const getAllInassignterviewers = async (
    interviewDetails: any,
    autditorId: any
  ) => {
    const auditorProfile = await createInterviewRound({
      auditorId: autditorId,
      intervieweeId: interviewDetails.intervieweeId,
      jobId: interviewDetails.jobId,
      HRid: interviewDetails.HRid,
    });
    assignHandler(interviewDetails.id, autditorId);
    getCandidateToAssign();
  };

  return (
    <div className={`${styles.appMain}`}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.appBody}>
          <div className={styles.assignBody}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons='auto'
              className={styles.TabScroll}
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              {candidateAssign && candidateAssign.length > 0 ? (
                candidateAssign.map((e: any, index: any) => {
                  return <IntervieweeCard e={e} index={index} />;
                })
              ) : (
                <div>No Data</div>
              )}
            </Tabs>
          </div>
          <hr />
          <div className={styles.assignMain}>
            {auditorAssign &&
              auditorAssign.length > 0 &&
              auditorAssign.map((e: any, index: any) => {
                return (
                  <AuditorCard
                    e={e}
                    dragAndDrop={getAllInassignterviewers}
                    index={index}
                  />
                );
              })}
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
