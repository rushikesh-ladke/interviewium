import { useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import Textbg from '../../images/textbackground.svg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Computer from '../../images/3d/computer.svg';
import Rocket from '../../images/3d/rocket.svg';
import Target from '../../images/3d/target.svg';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
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
    <>
      <div className={styles.HomepageMain}>
        <div className={`${styles.contain} container`}>
          <header className={styles.header}>
            <img className={styles.logo} src={Logo} alt='Logo' />
            <button className={styles.contactBtn} onClick={() => showModal()}>
              Contact
            </button>
          </header>
          <section className={styles.bannerSection}>
            <div className='row'>
              <div
                className={`${styles.textBg} col-md-5 d-flex flex-column justify-content-center}`}
              >
                <img src={Textbg} className={styles.textR} alt='cardIcon' />
                <h1>
                  Let's start
                  <br /> something
                  <br /> With us.
                </h1>
                <button
                  className={styles.getStartedBtn}
                  onClick={() => navigate('/')}
                >
                  Get Started
                </button>
                <ModalAntd
                  text
                  title='Get in Touch'
                  visible={isModalVisible}
                  onOk={() => handleOk()}
                  onCancel={() => handleCancel()}
                  className={styles.modalAnt}
                >
                  <h4>Schedule an Appointment</h4>

                  <div className={styles.message}>
                    <p>
                      Hey, my name is{' '}
                      <input type='text' placeholder='Type Here' /> and I'm
                      looking for
                      <select>
                        <option>Message1</option>
                        <option>Message1</option>
                        <option>Message1</option>
                      </select>
                      <br />
                    </p>
                    <p>
                      Get in touch with me at{' '}
                      <input type='email' placeholder='Your email ID here' />!
                    </p>
                  </div>
                  <button className={styles.getStartedBtn}>
                    Send Enquiry <ArrowRightAltIcon />
                  </button>
                </ModalAntd>
              </div>
              <div className='col-md-7'>
                <section className={styles.bottom_section}>
                  <div className={`${styles.card1} ${styles.sameCard}`}>
                    <div className={styles.barMain}>
                      <img
                        src={Computer}
                        className={styles.cardICon}
                        alt='cardIcon'
                      />
                      <div>
                        <h4>Transfer money</h4>
                        <p>
                          Bootstrap employs a handful of important global styles
                          and settings that you’ll need to be aware of when
                          using it
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.card2} ${styles.sameCard}`}>
                    <div className={styles.barMain}>
                      <img
                        src={Rocket}
                        className={styles.cardICon}
                        alt='cardIcon'
                      />
                      <div>
                        <h4>Safe Transfer</h4>
                        <p>
                          Bootstrap employs a handful of important global styles
                          and settings that you’ll need to be aware of when
                          using it
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.card3} ${styles.sameCard}`}>
                    <div className={styles.barMain}>
                      <img
                        src={Target}
                        className={styles.cardICon}
                        alt='cardIcon'
                      />
                      <div>
                        <h4>Real Partnership</h4>
                        <p>
                          Bootstrap employs a handful of important global styles
                          and settings that you’ll need to be aware of when
                          using it
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
