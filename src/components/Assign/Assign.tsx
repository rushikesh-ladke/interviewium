import * as React from 'react';
import styles from './styles.module.scss';
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
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </Tabs>
        </div>
        <hr />
        <div className={styles.assignMain}>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
          <div className={styles.assignCards}>
            <div className={styles.studentCard}>
              <h6>Doris Bailey</h6>
              <div className='d-flex'>
                <div className={styles.profile}>
                  <div className={styles.dot}></div>Senior Designer
                </div>
              </div>
              <div className={styles.activeStatus}>
                <TimelapseOutlinedIcon className={styles.time} /> 3 days ago
              </div>
              <div className='d-flex justify-content-center'>
                <img src={Avatar} alt='Profile' className={styles.profilePic} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
