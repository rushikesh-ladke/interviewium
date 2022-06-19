import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Profile from '../../images/avatar.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSingleDocument } from '../../functions/getUserProfile';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { PATH } from '../../constants/path';
import { Button } from 'antd';
import { ROLES } from '../../constants/roles';
import { postAppliedJob } from './job-details-api';

export const JobDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState<any>({});
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('uid');

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    const job = await getSingleDocument(searchParams.get('id'), DOCUMENTS.JOBS);
    if (job.loaded && job.error === null) {
      console.log(job);
      setJobData(job.data);
    } else {
      navigate(PATH.DASHBOARD);
    }
  };

  const applyJobHandler = () => {
    const id: any = searchParams.get('id');
    if (userId) {
      if (role !== ROLES.HR && role !== ROLES.INTERVIEWER) {
        postAppliedJob(id, userId);
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
                {jobData?.position} at {jobData?.companyName}
              </h4>
              <p>
                <strong>{jobData?.companyName}</strong> - {jobData?.location}.
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
                {jobData?.salary?.currency}
                {jobData?.salary?.salary}/{jobData?.salary?.tenure}
              </h6>
            </div>
          </div>
          <div className={styles.detailJob}>
            <h4>About Job</h4>
            <p>{jobData?.jobDetails?.aboutJob}</p>
          </div>
          <div className={styles.detailJob}>
            <h4>Job Description</h4>
            <p>{jobData?.jobDetails?.description}</p>
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
          <Button
            type='primary'
            block
            onClick={() => applyJobHandler()}
            disabled={
              role !== ROLES.HR && role !== ROLES.INTERVIEWER ? false : true
            }
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};
