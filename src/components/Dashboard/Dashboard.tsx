import styles from './styles.module.scss';
import Avatar from '../../images/avatar.svg';
import Rocket from '../../images/rocket.svg';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import G_Logo from '../../images/g_logo.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';
import { DOCUMENTS } from '../../constants/firebase-docs';
export const Dashboard = () => {
  const checkQuery = async () => {
    //getSingleDocument
    const docRef: any = doc(
      db,
      `/companyDocuments/ziBSKwp7uOESg83J3ug1/rounds/rounds`
    );
    const userData: any = await getDoc(docRef);
    if (userData.exists()) {
      console.log(userData.data());
      return {
        data: userData.data(),
        loaded: true,
        error: null,
      };
    } else {
      return {
        data: null,
        loaded: true,
        error: 'User Profile doesnot Exists',
      };
    }
  };

  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.appBody}>
        <div className='row'>
          <div className={`${styles.dashBleft} col-lg-8`}>
            <h6 className={styles.profileName}>Hi John!</h6>
            <div className={styles.twoCards}>
              <div className={`${styles.Cone} ${styles.TCards}`}>
                R&D for New Banking
                <br />
                Mobile App
                <div className={styles.socialL}>
                  <img className={styles.avatar} src={Avatar} alt='img' />
                </div>
              </div>
              <div className={`${styles.Ctwo} ${styles.TCards}`}>
                <div>
                  {' '}
                  Create Signup
                  <br /> Page
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                  </div>
                </div>
                <img className={styles.Rocket} src={Rocket} alt='img' />
              </div>
            </div>
            <div className={styles.monthlyT}>
              <h5>Monthly Tasks</h5>
              <div className={styles.twoBtn}>
                <button className={`${styles.ActiveBtn} ${styles.NewBtn}`}>
                  Archive
                </button>
                <button
                  className={styles.NewBtn}
                  onClick={() => {
                    checkQuery();
                  }}
                >
                  <AddOutlinedIcon className={styles.AddIcon} />
                  New
                </button>
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
                    <p>
                      Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control
                    </p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                  </div>
                </div>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>
                      Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control
                    </p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                  </div>
                </div>
                <div className={styles.BelowSec}>
                  <div className={styles.cphoto}>
                    <img alt='company Logo' src={G_Logo} />
                  </div>
                  <div className={styles.socialApp}>
                    <h6>Uber</h6>
                    <p>
                      Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control
                    </p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
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
                    <p>
                      Clicking another tab will toggle the visibility of this
                      one for the next. The tab JavaScript swaps classes to
                      control
                    </p>
                  </div>
                  <div className={styles.socialL}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className={styles.trailMain}>
              <div className={styles.trail}>
                <h5>Activity</h5>

                <div className={styles.mainTrail}>
                  <div className={styles.sec0}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                    <div className={styles.trailline}></div>
                  </div>
                  <div className={styles.sec1}>
                    <div className={styles.trailhead}>
                      <h6>Anya Gerlabine</h6>
                      <p>Today, 10:15 AM</p>
                    </div>
                    <div className={styles.comment}>
                      <h6>
                        Commented on <strong>Buka Bersama</strong>
                      </h6>
                    </div>
                    <div className={styles.commentSec}>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution
                    </div>
                  </div>
                </div>
                <div className={styles.mainTrail}>
                  <div className={styles.sec0}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                    <div className={styles.trailline}></div>
                  </div>
                  <div className={styles.sec1}>
                    <div className={styles.trailhead}>
                      <h6>Anya Gerlabine</h6>
                      <p>Today, 10:15 AM</p>
                    </div>
                    <div className={styles.comment}>
                      <h6>
                        Commented on <strong>Buka Bersama</strong>
                      </h6>
                    </div>
                    <div className={styles.commentSec}>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution
                    </div>
                  </div>
                </div>
                <div className={styles.mainTrail}>
                  <div className={styles.sec0}>
                    <img className={styles.avatar} src={Avatar} alt='img' />
                    <div className={styles.trailline}></div>
                  </div>
                  <div className={styles.sec1}>
                    <div className={styles.trailhead}>
                      <h6>Anya Gerlabine</h6>
                      <p>Today, 10:15 AM</p>
                    </div>
                    <div className={styles.comment}>
                      <h6>
                        Commented on <strong>Buka Bersama</strong>
                      </h6>
                    </div>
                    <div className={styles.commentSec}>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
