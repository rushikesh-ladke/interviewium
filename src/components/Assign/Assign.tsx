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
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Accordion from 'react-bootstrap/Accordion';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import G_Logo from '../../images/g_logo.svg';
import { Badge } from 'antd';
export const Assign = () => {
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
              <li className={`col-6 `}>
                <CommentOutlinedIcon className={styles.icons} />
                Feedback
              </li>
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
      <div className={styles.appBody}>Assign</div>
    </div>
  );
};
