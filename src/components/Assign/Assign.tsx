import * as React from 'react';
import styles from './styles.module.scss';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { OVER_ALL_STATUS, STATUS } from '../../constants/status';
import useAuth from '../../hooks/useAuth';
import { db } from '../../shared/firebase-config';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import IntervieweeCard from './dnd/intervieweeCard';
import AuditorCard from './dnd/auditorCard';
import { createInterviewRound } from '../../functions/createInterviewRound';
import { AddComments } from './modal/addComments';

export const Assign = () => {
  const [value, setValue] = React.useState(0);
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);
  const [candidateAssign, setCandidateAssign] = React.useState<any>([]);
  const [auditorAssign, setAuditorAssign] = React.useState<any>([]);
  const [addCommentsModal, setAddCommentsModal] = React.useState(false);
  const [HRComment, setHRComment] = React.useState('');
  const [interviewDetails, setInterviewDetails] = React.useState<any>();
  const [auditor, setAuditor] = React.useState<any>();

  React.useEffect(() => {
    getCandidateToAssign();
    getAuditorToAssign();
  }, []);

  const getCandidateToAssign = async () => {
    const companyID = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEWS),
      where('active', '==', true),
      where('companyDetails.companyId', '==', companyID),
      where('status', '==', STATUS.ASSIGN),
      where('overAllStatus', '==', OVER_ALL_STATUS.ONGOING_MAIN)
    );

    const querySnapshot = await getDocs(q);
    const requests: any = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      requests.push({
        ...data,
        id: doc.id,
      });
    });
    console.log(requests, 'setCandidateAssign');
    setCandidateAssign(requests);
  };

  const getAuditorToAssign = async () => {
    const companyID = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.USERS),
      where('active', '==', true),
      where('ON_BOARDED', '==', true),
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
    console.log(requests, 'setAuditorAssign');
    setAuditorAssign(requests);
  };

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const createRound = async () => {
    const roundNumber = interviewDetails.ongoingRoundData
      ? interviewDetails.ongoingRoundData + 1
      : 1;

    await createInterviewRound({
      companyDetails: {
        ...interviewDetails.companyDetails,
      },
      intervieweeDetails: {
        ...interviewDetails.intervieweeDetails,
        id: interviewDetails.intervieweeId,
      },
      jobDetails: {
        ...interviewDetails.jobDetails,
      },
      interviewId: interviewDetails.id,
      auditorDetails: {
        auditorEmail: auditor.email,
        auditorId: auditor.id,
        auditorName: auditor.profile.firstName + ' ' + auditor.profile.lastName,
        auditorMeetingLink: auditor.links.meetingLink,
      },
      HRComments: HRComment,
      ongoingRoundData: roundNumber,
    });
    // assignHandler(interviewDetails.id, auditor.id);
    getCandidateToAssign();
  };

  const addCommentsModalHandler = (interviewDetails: any, auditor: any) => {
    setAddCommentsModal(true);
    setInterviewDetails(interviewDetails);
    setAuditor(auditor);
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
                    dragAndDrop={createRound}
                    index={index}
                    commentsModal={addCommentsModalHandler}
                  />
                );
              })}
          </div>
        </div>
      </DndProvider>
      <AddComments
        isModalVisible={addCommentsModal}
        setIsModalVisible={setAddCommentsModal}
        setHRComment={setHRComment}
        onOk={() => {
          createRound();
        }}
      />
    </div>
  );
};
