import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg'
import G_Logo from '../../images/g_logo.svg'
import { Input } from 'antd';

export const Register = () => {
  return (
    <div className={`${styles.main} container`}>
      <header className={styles.header}>
        <div className={styles.left_col}></div>
        <div className={styles.center_col}>
          <a target="_self" className={styles.c_link} href="/login" rel="noopener noreferrer">
            <img alt="Interviewium" src={Logo} title="Interviewium" />
          </a>
        </div>

      </header>
      <section className={styles.SubBodyL}>
        <h2>Sign up to Interviewium</h2>
        <div className={styles.subh}>We suggest using the <strong>email address that you use at work.</strong></div>
        <div className={styles.middleA}>
          <button className={styles.gmail} id="google_login_button" data-qa="base_google_login_button" type="button">
            <img src={G_Logo} alt="G logo" /><span className={styles.gLabel}><span>Sign up with Google</span></span>
          </button>
          <div className={styles.divider}>
            <hr className={styles.left_rule} />
            <div className={styles.L_or}>OR</div>
            <hr className={styles.right_rule} />
          </div>
          <div className='row'>
            <div className="col-12 col-sm-6">
              <Input className={styles.form_control} placeholder="Name" />
            </div>
            <div className="col-12 col-sm-6">
              <Input className={styles.form_control} placeholder="Company Name" />
            </div>
          </div>
          <Input className={styles.form_control} placeholder="Workspace Name" />
          <Input className={styles.form_control} placeholder="Basic usage" />
          <Input.Password className={styles.form_control} placeholder="Input password" />
          <button className={styles.signBtn}>Sign up</button>
          <div className={styles.sh_back}>
            <div className={styles.right_col}>
              <div className={styles.sideLink}>Already using Interviewium?<br />
                <a target="_self" className={`${styles.createLink}`} href="/signin" rel="noopener noreferrer">Sign in to an existing workspace</a>
              </div>
            </div>
          </div>
        </div>

      </section >
    </div >
  );
}

