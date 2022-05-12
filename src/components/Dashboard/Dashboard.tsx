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
import Avatar from '../../images/avatar.svg';
import Rocket from '../../images/rocket.svg';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import G_Logo from '../../images/g_logo.svg';


export const Dashboard = () => {

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
              <li className={`col-6`}>
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
                <h5><strong>Give feedback</strong></h5>
                <p>What do you think of the editing tool?</p>
                <div className={styles.feedShare}>
                  <label className="form-label">Do you have any thoughts you'd like to share?</label>
                  <textarea className="form-control"></textarea>
                </div>


                <label className="form-check-label mb-3">May we follow you up on your feedback?</label>
                <div className="mb-3 d-flex">
                  <div>
                    <input type="radio" className="form-check-input" />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className='ms-5'>
                    <input type="radio" className="form-check-input" />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
                <div className='d-flex mt-5'>
                  <button className={styles.sendBtn}>Send</button>
                  <button  className={styles.cancelBtn}>Cancel</button>
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
        </aside >
      </div >
      <div className={styles.appBody}>
        <div className="row">
          <div className={`${styles.dashBleft} col-lg-8`}>
            <h6 className={styles.profileName}>
              Hi John!
            </h6>
            <div className={styles.twoCards}>
              <div className={`${styles.Cone} ${styles.TCards}`}>
                R&D for New Banking<br />Mobile App
                <div className={styles.socialL}>
                  <img className={styles.avatar} src={Avatar} alt="img" />
                </div>
              </div>
              <div className={`${styles.Ctwo} ${styles.TCards}`}>
                <div> Create Signup<br /> Page
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt="img" />
                  </div>
                </div>
                <img className={styles.Rocket} src={Rocket} alt="img" />

              </div>
            </div>
            <div className={styles.monthlyT}>
              <h5>Monthly Tasks</h5>
              <div className={styles.twoBtn}>
                <button className={`${styles.ActiveBtn} ${styles.NewBtn}`}>Archive</button>
                <button className={styles.NewBtn}><AddOutlinedIcon className={styles.AddIcon} />New</button>
              </div>
            </div>
            <div className={styles.activeT}>
              <div className={styles.todayS}>
                <h6>Today</h6>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control</p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt="img" />
                  </div>
                </div>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control</p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt="img" />
                  </div>
                </div>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control</p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt="img" />
                  </div>
                </div>

              </div>
              <div className={styles.todayS}>
                <h6>Tomorrow</h6>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control</p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt="img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">

          </div>
        </div>
      </div>
    </div >
  );
};
