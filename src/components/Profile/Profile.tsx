import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
export const Profile = () => {
  return (
    <>
      <div className={styles.appBody}>
        <div className={styles.profileBody}>
          <div className={styles.profileImg}>
            <img src={ProfileImg} alt='profile-img' />
          </div>
          <div className={styles.profiledetails}>
            <h5>Kate Velasswe</h5>
            <p>Product Lead, CEO</p>
            <div className={styles.otherDetails}>
              <div className={styles.sec1}>
                <h6>
                  <LocationOnOutlinedIcon className={styles.icon} />
                  Pune, MH
                </h6>
                <h6>
                  <CallOutlinedIcon className={styles.icon} />
                  +91 6748239245
                </h6>
              </div>
              <div className={styles.sec1}>
                <h6>
                  <PointOfSaleOutlinedIcon className={styles.icon} />
                  Sales Department
                </h6>
                <h6>
                  <EmailOutlinedIcon className={styles.icon} />
                  Demo@gmail.com
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.appBody} ${styles.profilDown}`}>
        <div className={styles.profileBodyinfo}>
          <div className='row'>
            <div className='col-lg-4'>
              <h5>On the web</h5>
              <p>
                <InstagramIcon className={styles.icon} /> Lorum Ipsum
              </p>
              <p>
                <FacebookIcon className={styles.icon} /> Lorum Ipsum
              </p>
              <p>
                <TwitterIcon className={styles.icon} /> Lorum Ipsum
              </p>
              <p>
                <LinkedInIcon className={styles.icon} /> Lorum Ipsum
              </p>
            </div>
            <div className='col-lg-4'>
              <h5>About</h5>
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
              </p>
            </div>
            <div className='col-lg-4'>
              <h5>Skills</h5>
              <div className={styles.Badges}>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-lg-4'>
              <h5>Languages</h5>
              <div className={styles.Badges}>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
              </div>
            </div>
            <div className='col-lg-4'>
              <h5>Attachments</h5>
              <p>
                <InsertDriveFileIcon className={styles.icon} /> Resume.pdf
              </p>
              <p>
                <InsertDriveFileIcon className={styles.icon} /> Portfolio.ppt
              </p>
              <p>
                <PlayCircleOutlineIcon className={styles.icon} /> Lorum
                Ipsum.mov
              </p>
            </div>
            <div className='col-lg-4'>
              <h5>Sectors of expertise</h5>
              <div className={styles.Badges}>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
