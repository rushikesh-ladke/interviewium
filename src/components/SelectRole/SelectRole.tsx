import styles from './styles.module.scss';
import Interviewer from '../../images/InterviewerRole.svg';
import Interviewee from '../../images/IntervieweeRole.svg';
import { ROLES } from '../../constants/roles';
import { addNewUserToDB } from './select-role-api';
import useAuth from '../../hooks/useAuth';
import { saveToLocalStorage } from '../../shared/util';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';

export const SelectRole = () => {
  const { auth }: any = useAuth();
  const navigate = useNavigate();

  const selectRoleHandler = async (role: any) => {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    await addNewUserToDB(auth.userId, user.email, role);
    saveToLocalStorage({
      role: role,
    });
    navigate(PATH.DASHBOARD);
  };

  return (
    <>
      <div className={styles.mainSelectRole}>
        <div className={styles.rolesMain}>
          <div className={styles.firstr}>
            <img
              src={Interviewer}
              className={styles.imgR}
              alt='Interviewer img'
            />
            <button
              className={styles.rolbtn}
              onClick={() => selectRoleHandler(ROLES.INTERVIEWER)}
            >
              Interviewer
            </button>
          </div>
          <div className={styles.firstr}>
            <img
              src={Interviewee}
              className={`${styles.imgR} ${styles.sImg}`}
              alt='Interviewee img'
            />
            <button
              className={styles.rolbtn}
              onClick={() => selectRoleHandler(ROLES.INTERVIEWEE)}
            >
              Interviewee
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
