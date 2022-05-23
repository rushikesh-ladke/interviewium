import { useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.scss';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
export const Sidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ModalAntd: any = Modal;

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.header}>
        <aside className={styles.aside}>
          <ul>
            <h6>General</h6>
            <div className='d-flex'>
              <li className={`col-6`} onClick={() => console.log('Dashboard')}>
                <DashboardOutlinedIcon className={styles.icons} />
                Dashboard
              </li>
              <li className={`col-6  ${styles.active}`}>
                <WorkOutlineOutlinedIcon className={styles.icons} />
                Jobs
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <AssignmentIndOutlinedIcon className={styles.icons} />
                Assign
              </li>
              <li className={`col-6 `}>
                <PersonPinOutlinedIcon className={styles.icons} />
                Interviewer
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <ListAltOutlinedIcon className={styles.icons} />
                Ongoing
                <br /> Interviews
              </li>
              <li className={`col-6 `}>
                <AppRegistrationOutlinedIcon className={styles.icons} />
                Previous
                <br /> Interviews
              </li>
            </div>
          </ul>
          <ul>
            <h6>Account</h6>
            <div className='d-flex'>
              <li className={`col-6 `} onClick={() => showModal()}>
                <CommentOutlinedIcon className={styles.icons} />
                Feedback
              </li>
              <ModalAntd
                text
                visible={isModalVisible}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                className={styles.FeedbackModal}
              >
                <h5>
                  <strong>Give feedback</strong>
                </h5>
                <p>What do you think of the editing tool?</p>
                <div className={styles.feedShare}>
                  <label className='form-label'>
                    Do you have any thoughts you'd like to share?
                  </label>
                  <textarea className='form-control'></textarea>
                </div>

                <label className='form-check-label mb-3'>
                  May we follow you up on your feedback?
                </label>
                <div className='mb-3 d-flex'>
                  <div>
                    <input type='radio' className='form-check-input' />
                    <label className='form-check-label'>Yes</label>
                  </div>
                  <div className='ms-5'>
                    <input type='radio' className='form-check-input' />
                    <label className='form-check-label'>No</label>
                  </div>
                </div>
                <div className='d-flex mt-5'>
                  <button className={styles.sendBtn}>Send</button>
                  <button className={styles.cancelBtn}>Cancel</button>
                </div>
              </ModalAntd>
              <li className={`col-6 `}>
                <SettingsApplicationsIcon className={styles.icons} />
                Settings
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <PowerSettingsNewOutlinedIcon className={styles.icons} />
                Log out
              </li>
            </div>
          </ul>
          <ul>
            <div className={styles.boxMain}></div>
          </ul>
        </aside>
      </div>
    </div>
  );
};
