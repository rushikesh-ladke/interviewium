import styles from './styles.module.scss';
import Interviewer from '../../images/InterviewerRole.svg'
import Interviewee from '../../images/IntervieweeRole.svg'

export const SelectRole = () => {
  return (<>
    <div className={styles.mainSelectRole}>
      <div className={styles.rolesMain}>
        <div className={styles.firstr}> 
          <img src={Interviewer} className={styles.imgR} alt="Interviewer img" />
          <button className={styles.rolbtn}>Interviewer</button>
        </div>
        <div className={styles.firstr}>
          <img src={Interviewee} className={`${styles.imgR} ${styles.sImg}`} alt="Interviewee img"/>
          <button className={styles.rolbtn}>Interviewee</button>
        </div>
      </div>
    </div>
  </>);
};
