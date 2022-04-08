import * as React from 'react';
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
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import Avatar from '../../images/avatar.svg';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

export const Assign = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
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
      <div className={styles.appBody}>
        <div className={styles.assignBody}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            className={styles.TabScroll}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </Tabs>
        </div>
        <hr />
        <div className={styles.assignMain}>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'><div className={styles.profile}><div className={styles.dot}></div>Senior Designer</div></div>
              <div className={styles.activeStatus}><TimelapseOutlinedIcon className={styles.time} /> 3 days ago</div>
              <div className='d-flex justify-content-center'><img src={Avatar} alt="Profile-photo" className={styles.profilePic} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
