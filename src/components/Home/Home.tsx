import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import HomeBanner from '../../images/homebanner.svg';
export const Home = () => {

  return (<>
    <div className={`${styles.HomepageMain} container`}>
      <header className={styles.header}>
        <img className={styles.logo} src={Logo} alt="Logo" />
        <button className={styles.contactBtn}>Contact</button>
      </header>
      <section className={styles.bannerSection}>
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1>Let's start<br /> something<br /> With us.</h1>
            <button className={styles.getStartedBtn}>Get Started</button>
          </div>
          <div className="col-md-6">
            <img className={styles.HomeBanner} src={HomeBanner} alt="HomeBanner" />
          </div>
        </div>
      </section>
      <section className={styles.bottom_section}>
        <div className="row">
          <div className="col-lg-4">
            <div className={styles.barMain}>
              <div>
                <h4>Transfer money</h4>
                <p>Bootstrap employs a handful of important global styles and settings that you’ll need to
                  be aware of when using it</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={styles.barMain}>
              <div>
                <h4>Safe Transfer</h4>
                <p>Bootstrap employs a handful of important global styles and settings that you’ll need to
                  be aware of when using it</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={styles.barMain}>
              <div>
                <h4>Real Partnership</h4>
                <p>Bootstrap employs a handful of important global styles and settings that you’ll need to
                  be aware of when using it</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>);
};
