import * as React from 'react';
import styles from './styles.module.scss';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import Avatar from '../../images/avatar.svg';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { STATUS } from '../../constants/interview-status';
import useAuth from '../../hooks/useAuth';
import { db } from '../../shared/firebase-config';
import { ROLES } from '../../constants/roles';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import IntervieweeCard from './dnd/intervieweeCard';
import AuditorCard from './dnd/auditorCard';

export const Assign = () => {
  const [value, setValue] = React.useState(0);
  const { auth } = useAuth();

  const [candidateAssign, setCandidateAssign] = React.useState<any>([]);
  const [auditorAssign, setAuditorAssign] = React.useState<any>([]);

  React.useEffect(() => {
    getCandidateToAssign();
    getAuditorToAssign();
  }, []);

  const getCandidateToAssign = async () => {
    const companyID = auth.profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEW),
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
    const companyID = auth.profile.companyDetails.companyId;
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

  const getAllInassignterviewers = (
    humanResourceId: any,
    intervieweeId: any,
    jobId: any,
    id: any
  ) => {
    console.log(humanResourceId, intervieweeId, jobId, id);
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
                candidateAssign.map((e: any) => {
                  return <IntervieweeCard e={e} />;
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
              auditorAssign.map((e: any) => {
                return (
                  <AuditorCard e={e} dragAndDrop={getAllInassignterviewers} />
                );
              })}
          </div>
        </div>
      </DndProvider>
    </div>
  );
};
