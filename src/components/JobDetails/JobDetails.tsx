import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Profile from '../../images/avatar.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSingleDocument } from '../../functions/getUserProfile';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { PATH } from '../../constants/path';
import { Button, Result } from 'antd';
import { ROLES } from '../../constants/roles';
import { postInterviewDetails } from './job-details-api';
import useAuth from '../../hooks/useAuth';
import { updateDocument } from '../../functions/updateDoc';
import { arrayRemove } from 'firebase/firestore';

export const JobDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [jobData, setJobData] = useState<any>({});
  const [apply, setApply] = useState(false);

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('uid');

  useEffect(() => {
    if (Object.keys(auth.profile).length === 0 && userId) {
      getProfileData(userId);
    }
    getJobData();
  }, []);

  const getProfileData = async (id: any) => {
    const profile = await getSingleDocument(id, DOCUMENTS.USERS);
    if (profile.loaded && profile.error === null) {
      setAuth({
        ...auth,
        profile: profile?.data,
      });
    }
  };
  const getJobData = async () => {
    const job = await getSingleDocument(searchParams.get('id'), DOCUMENTS.JOBS);
    if (job.loaded && job.error === null) {
      setJobData(job.data);
      updateDocument(DOCUMENTS.JOBS, searchParams.get('id'), {
        views: job.data.views + 1,
      });
    } else {
      navigate(PATH.DASHBOARD);
    }
  };

  const applyJobHandler = () => {
    const id: any = searchParams.get('id');
    if (userId) {
      if (role !== ROLES.HR && role !== ROLES.INTERVIEWER) {
        updateDocument(DOCUMENTS.USERS, userId, {
          applyJob: arrayRemove(id),
        });
        updateDocument(DOCUMENTS.JOBS, searchParams.get('id'), {
          totalApplied: jobData.totalApplied + 1,
        });
        setApply(true);
        postInterviewDetails({
          HRDetails: {
            ...jobData.HRDetails,
            HRComments: '',
          },
          companyDetails: {
            ...jobData.companyDetails,
          },
          intervieweeDetails: {
            intervieweeName:
              auth.profile.profile.firstName +
              ' ' +
              auth.profile.profile.lastName,
            intervieweeEmail: auth.profile.email,
            intervieweeContact: auth.profile.profile.contact,
          },
          jobDetails: {
            jobId: id,
            jobPost: jobData?.position,
          },
          intervieweeId: userId,
        });
      }
    } else {
      navigate(PATH.REGISTER);
      localStorage.setItem('_application', id);
    }
  };

  return (
    <>
      <div className={styles.Jobmain}>
        <div className={styles.firstsection}>
          <div className={styles.profilesec}>
            <img src={Profile} alt='profile' />
          </div>
        </div>
        <div className={styles.secondsection}>
          <div className='d-flex justify-content-between'>
            <div className={styles.careerRole}>
              <h4>
                {jobData?.position} at {jobData?.companyDetails?.companyName}
              </h4>
              <p>
                <strong>{jobData?.companyDetails?.companyName}</strong> -{' '}
                {jobData?.location}.
              </p>
            </div>
            <div className={styles.careerRole}>
              <div className='d-flex mb-3'>
                <FavoriteBorderIcon className={styles.icon} />
                <ShareOutlinedIcon className={styles.icon} />
              </div>
              <p>
                Posted 8 Days ago <strong>98 Applicants</strong>
              </p>
            </div>
          </div>
          <div className={styles.tableM}>
            <div className={styles.details}>
              <p>Experience</p>
              <h6>
                {jobData?.minExp} - {jobData?.maxExp} years
              </h6>
            </div>
            <div className={styles.details}>
              <p>Open Positions</p>
              <h6>{jobData.totalHiresRequired}</h6>
            </div>
            <div className={styles.details}>
              <p>Employee Type</p>
              <h6>{jobData?.jobType}</h6>
            </div>
            <div className={styles.details}>
              <p>Workspace Type</p>
              <h6>{jobData?.workspaceType}</h6>
            </div>
            <div className={styles.details}>
              <p>Offer Salary</p>
              <h6>
                {jobData?.currency}
                {jobData?.salary}/{jobData?.tenure}
              </h6>
            </div>
          </div>
          <div className={styles.detailJob}>
            <h4>About Job</h4>
            <p>{jobData?.aboutJob}</p>
          </div>
          <div className={styles.detailJob}>
            <h4>Job Description</h4>
            <p>{jobData?.description}</p>
            {/* <ul>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
            </ul> */}
          </div>
          {apply ? (
            <Result title='Applied' status='success' />
          ) : (
            <Button
              type='primary'
              block
              onClick={() => applyJobHandler()}
              disabled={
                role === ROLES.HR ||
                role === ROLES.INTERVIEWER ||
                jobData?.disabled === true ||
                jobData?.published === false
                  ? true
                  : false
              }
            >
              Apply
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
