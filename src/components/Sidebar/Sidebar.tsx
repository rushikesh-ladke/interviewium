import { useState, useEffect } from 'react';
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
import { ROLES } from '../../constants/roles';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '../../constants/path';
import { Feedback } from './modal/feedback';
import { Logout } from './modal/logout';
import { InitialProfileData } from './modal/initialProfile';
import useAuth from '../../hooks/useAuth';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { getSingleDocument } from '../../functions/getUserProfile';
import { Badge } from 'antd';

export const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const userRole: any = localStorage.getItem('role');
  const userId: any = localStorage.getItem('uid');
  const { auth, setAuth }: any = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [initialProfileModalVisible, setInitialProfileModalVisible] =
    useState(false);

  useEffect(() => {
    if (Object.keys(auth.profile).length === 0) {
      getProfileData(userId);
    } else {
      checkProfileFulfilled(auth.profile);
    }
  }, []);

  const getProfileData = async (id: any) => {
    const profile = await getSingleDocument(id, DOCUMENTS.USERS);
    if (profile.loaded && profile.error === null) {
      setAuth({
        ...auth,
        profile: profile?.data,
      });
      checkProfileFulfilled(profile?.data);
    } else {
      navigate(PATH.LOGIN);
    }
  };

  const checkProfileFulfilled = (data: any) => {
    if (data.ON_BOARDED === false) setInitialProfileModalVisible(true);
  };

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

  const saveProfileDataHandler = (value: any) => {
    setInitialProfileModalVisible(false);
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
                    className={`col-6 ${
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
                      location?.pathname === PATH.APPLICATION
                        ? styles.active
                        : null
                    }}`}
                    onClick={() => navigate(PATH.APPLICATION)}
                  >
                    <WorkOutlineOutlinedIcon className={styles.icons} />
                    Application
                  </li>
                </div>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
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
                      location?.pathname === PATH.JOBS ? styles.active : null
                    }`}
                    onClick={() => console.log('Apply')}
                  >
                    <Badge
                      count={
                        auth?.profile?.applyJob
                          ? auth?.profile?.applyJob.length
                          : null
                      }
                    >
                      <WorkOutlineOutlinedIcon className={styles.icons} />
                    </Badge>
                    Apply
                  </li>
                </div>
              </>
            ) : userRole === ROLES.INTERVIEWER ? (
              <>
                <div className='d-flex'>
                  <li
                    className={`col-6 ${
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
              <li className={`col-6 `}>
                <SettingsApplicationsIcon
                  className={styles.icons}
                  // TODO:secondary profile info
                  // onClick={() =>
                  //   showModal(
                  //     setInitialProfileModalVisible,
                  //     initialProfileModalVisible
                  //   )
                  // }
                />
                Settings
              </li>
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
        {/* all Modals start */}
        <Feedback
          isModalVisible={isModalVisible}
          handleOk={() => feedbackHandler()}
          handleCancel={() => {
            showModal(setIsModalVisible, isModalVisible);
          }}
          setIsModalVisible={setIsModalVisible}
        />
        <Logout
          isModalVisible={logoutModalVisible}
          handleOk={() => logoutHandler()}
          handleCancel={() => {
            showModal(setLogoutModalVisible, logoutModalVisible);
          }}
          setIsModalVisible={setLogoutModalVisible}
        />
        <InitialProfileData
          isModalVisible={initialProfileModalVisible}
          saveProfileDataHandler={saveProfileDataHandler}
        />
        {/* all Modals end*/}
      </div>
    </div>
  );
};
