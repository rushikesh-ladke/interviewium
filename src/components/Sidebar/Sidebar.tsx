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
import { ROLES } from 'constants/roles';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH } from 'constants/path';
export const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const userRole: any = localStorage.getItem('role');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const ModalAntd: any = Modal;

  const showModal = (handler: any, param: any) => {
    handler(!param);
  };

  const feedbackHandler = () => {
    setIsModalVisible(false);
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate(PATH.HOME);
  };

  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.header}>
        <aside className={styles.aside}>
          <ul>
            <h6>General</h6>
            {userRole === ROLES.HR ? (
              <>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.DASHBOARD
                        ? styles.active
                        : null
                    }`}
                    onClick={() => navigate(PATH.DASHBOARD)}
                  >
                    <DashboardOutlinedIcon className={styles.icons} />
                    Dashboard
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.JOBS ? styles.active : null
                    }`}
                    onClick={() => navigate(PATH.JOBS)}
                  >
                    <WorkOutlineOutlinedIcon className={styles.icons} />
                    Jobs
                  </li>
                </div>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.ASSIGN ? styles.active : null
                    } `}
                    onClick={() => navigate(PATH.ASSIGN)}
                  >
                    <AssignmentIndOutlinedIcon className={styles.icons} />
                    Assign
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.INTERVIEWER
                        ? styles.active
                        : null
                    } `}
                    onClick={() => navigate(PATH.INTERVIEWER)}
                  >
                    <PersonPinOutlinedIcon className={styles.icons} />
                    Interviewer
                  </li>
                </div>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.ONGOING ? styles.active : null
                    } `}
                    onClick={() => navigate(PATH.ONGOING)}
                  >
                    <ListAltOutlinedIcon className={styles.icons} />
                    Ongoing
                    <br /> Interviews
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.PREVIOUS
                        ? styles.active
                        : null
                    } `}
                    onClick={() => navigate(PATH.PREVIOUS)}
                  >
                    <AppRegistrationOutlinedIcon className={styles.icons} />
                    Previous
                    <br /> Interviews
                  </li>
                </div>
              </>
            ) : userRole === ROLES.INTERVIEWEE ? (
              <>
                <div className='d-flex'>
                  <li
                    className={`col-6${
                      location?.pathname === PATH.DASHBOARD
                        ? styles.active
                        : null
                    } `}
                    onClick={() => navigate(PATH.DASHBOARD)}
                  >
                    <DashboardOutlinedIcon className={styles.icons} />
                    Dashboard
                  </li>
                  <li
                    className={`col-6${
                      location?.pathname === PATH.APPLICATION
                        ? styles.active
                        : null
                    }}`}
                    onClick={() => navigate(PATH.APPLICATION)}
                  >
                    <WorkOutlineOutlinedIcon className={styles.icons} />
                    Jobs
                  </li>
                </div>
                <div className='d-flex'>
                  <li
                    className={`col-6${
                      location?.pathname === PATH.FEEDBACK
                        ? styles.active
                        : null
                    }  `}
                    onClick={() => navigate(PATH.FEEDBACK)}
                  >
                    <AssignmentIndOutlinedIcon className={styles.icons} />
                    Feedback
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.PROFILE ? styles.active : null
                    } `}
                    onClick={() => navigate(PATH.PROFILE)}
                  >
                    <PersonPinOutlinedIcon className={styles.icons} />
                    Profile
                  </li>
                </div>
                <div className='d-flex'>
                  <li className={`col-6 `}></li>
                  <li className={`col-6 `}></li>
                </div>
              </>
            ) : userRole === ROLES.INTERVIEWER ? (
              <>
                <div className='d-flex'>
                  <li
                    className={`col-6${
                      location?.pathname === PATH.DASHBOARD
                        ? styles.active
                        : null
                    } `}
                    onClick={() => navigate(PATH.DASHBOARD)}
                  >
                    <DashboardOutlinedIcon className={styles.icons} />
                    Dashboard
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.FEEDBACK
                        ? styles.active
                        : null
                    }`}
                    onClick={() => navigate(PATH.FEEDBACK)}
                  >
                    <WorkOutlineOutlinedIcon className={styles.icons} />
                    Feedback
                  </li>
                </div>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.INTERVIEWS
                        ? styles.active
                        : null
                    } `}
                    onClick={() => navigate(PATH.INTERVIEWS)}
                  >
                    <AssignmentIndOutlinedIcon className={styles.icons} />
                    Interviews
                  </li>
                  <li
                    className={`col-6 ${
                      location?.pathname === PATH.PROFILE ? styles.active : null
                    } `}
                    onClick={() => navigate(PATH.PROFILE)}
                  >
                    <PersonPinOutlinedIcon className={styles.icons} />
                    Profile
                  </li>
                </div>
                <div className='d-flex'>
                  <li className={`col-6 `}></li>
                  <li className={`col-6 `}></li>
                </div>
              </>
            ) : null}
          </ul>
          <ul>
            <h6>Account</h6>
            <div className='d-flex'>
              <li
                className={`col-6 `}
                onClick={() => showModal(setIsModalVisible, isModalVisible)}
              >
                <CommentOutlinedIcon className={styles.icons} />
                Feedback
              </li>
              <ModalAntd
                text
                visible={isModalVisible}
                onOk={() => feedbackHandler()}
                onCancel={() => showModal(setIsModalVisible, isModalVisible)}
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
            <ModalAntd
              title='Logout'
              visible={logoutModalVisible}
              onOk={logoutHandler}
              onCancel={() => {
                showModal(setLogoutModalVisible, logoutModalVisible);
              }}
            >
              <p>Bye Bye! Be back soon.</p>
              <p>
                Hope you liked it here, provide your feedback to grow together
              </p>
            </ModalAntd>
            <div className='d-flex'>
              <li
                className={`col-6 `}
                onClick={() =>
                  showModal(setLogoutModalVisible, logoutModalVisible)
                }
              >
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
