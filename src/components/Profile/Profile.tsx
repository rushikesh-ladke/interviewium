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
import { useEffect, useState } from 'react';
import { getSingleDocument } from '../../functions/getUserProfile';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { notification, Spin } from 'antd';
import GroupsIcon from '@mui/icons-material/Groups';
import { InitialProfileData } from './modal/initialProfile';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ROLES } from '../../constants/roles';

export const Profile = () => {
  const [profileData, setProfileData] = useState<any>();
  const [load, setLoad] = useState(false);
  const [initialProfileModalVisible, setInitialProfileModalVisible] =
    useState(false);

  const userId = localStorage.getItem('uid');
  const role = localStorage.getItem('role');

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const profile = await getSingleDocument(userId, DOCUMENTS.USERS);
    if (profile.loaded && profile.error === null) {
      setProfileData(profile.data);
      console.log(profile.data);
      setLoad(true);
    } else {
      notification['error']({
        message: 'Something went wrong',
        description: 'Try Reloading the page',
      });
    }
  };

  if (!load) {
    return (
      <div className={styles.appBody}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className={styles.appBody}>
        <div className={styles.profileBody}>
          <div className={styles.profileImg}>
            <img src={ProfileImg} alt='profile-img' />
          </div>
          <div className={styles.profiledetails}>
            <h5>
              {profileData?.profile?.firstName +
                ' ' +
                profileData?.profile?.lastName}
              <span
                style={{ padding: 5, color: 'blue', cursor: 'pointer' }}
                onClick={() => setInitialProfileModalVisible(true)}
              >
                <ModeEditIcon className={styles.icon} />
              </span>
            </h5>

            <p>{profileData?.currentPosition}</p>
            <div className={styles.otherDetails}>
              <div className={styles.sec1}>
                <h6>
                  <LocationOnOutlinedIcon className={styles.icon} />
                  {profileData?.profile?.location}
                </h6>
                <h6>
                  <CallOutlinedIcon className={styles.icon} />
                  {profileData?.profile?.contact}
                </h6>
              </div>
              <div className={styles.sec1}>
                <h6>
                  <PointOfSaleOutlinedIcon className={styles.icon} />
                  Portal Role : {profileData?.role}
                </h6>
                <h6>
                  <EmailOutlinedIcon className={styles.icon} />
                  {profileData?.email}
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
              {role !== ROLES.INTERVIEWEE && (
                <p>
                  <GroupsIcon className={styles.icon} />{' '}
                  <a
                    href={profileData?.links?.meetingLink}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Joining Link
                  </a>
                </p>
              )}

              {/* <p>
                <FacebookIcon className={styles.icon} /> Lorum Ipsum
              </p>
              <p>
                <TwitterIcon className={styles.icon} /> Lorum Ipsum
              </p> */}
              <p>
                <LinkedInIcon className={styles.icon} />{' '}
                <a
                  href={profileData?.links?.linkedin}
                  target='_blank'
                  rel='noreferrer'
                >
                  LinkedIn
                </a>
              </p>
            </div>
            {/* <div className='col-lg-4'>
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
            </div> */}
            {/* <div className='col-lg-4'>
              <h5>Skills</h5>
              <div className={styles.Badges}>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
                <div className={styles.section}>Lorum Ipsum</div>
              </div>
            </div> */}
          </div>
          {/* <div className='row mt-4'>
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
          </div> */}
        </div>
      </div>
      <InitialProfileData
        isModalVisible={initialProfileModalVisible}
        setInitialProfileModalVisible={() =>
          setInitialProfileModalVisible(false)
        }
        profileData={profileData}
      />
    </>
  );
};
