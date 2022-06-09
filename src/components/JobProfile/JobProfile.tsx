import styles from './styles.module.scss';
import Profile from '../../images/avatar.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
export const JobProfile = () => {
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
              <h4>UI/UX Designer</h4>
              <p>
                <strong>Patreon</strong> - londontown, MD.
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
              <h6>Minimum one year</h6>
            </div>
            <div className={styles.details}>
              <p>Work Level</p>
              <h6>Senior Level</h6>
            </div>
            <div className={styles.details}>
              <p>Employee Type</p>
              <h6>Full Time Jobs</h6>
            </div>
            <div className={styles.details}>
              <p>Offer Salary</p>
              <h6>$2150/Month</h6>
            </div>
          </div>
          <div className={styles.detailJob}>
            <h4>Overview</h4>
            <p>
              t is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
          <div className={styles.detailJob}>
            <h4>Job Description</h4>
            <ul>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
              <li>
                a reader will be distracted by the readable content of a page wh
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
