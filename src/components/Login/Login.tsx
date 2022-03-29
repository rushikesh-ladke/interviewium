import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg'
import G_Logo from '../../images/g_logo.svg'

export const Login = () => {
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
        <h2>Sign in to Interviewium</h2>
        <div className={styles.subh}>We suggest using the <strong>email address that you use at work.</strong></div>
        <div className={styles.middleA}>
          <button className={styles.gmail} id="google_login_button" data-qa="base_google_login_button" type="button">
            <img src={G_Logo} alt="G logo" /><span className={styles.gLabel}><span>Sign in with Google</span></span>
          </button>
          <div className={styles.divider}>
            <hr className={styles.left_rule} />
            <div className={styles.L_or}>OR</div>
            <hr className={styles.right_rule} />
          </div>
          <input type="email" className={styles.form_control} placeholder="name@example.com" />
          <input type="password" className={styles.form_control} placeholder="enter password" />
          <button className={styles.signBtn}>Sign In</button>
          <div className={styles.sh_back}>
            <h4 className={styles.forgot}><a href="/forgot">Forgot Password?</a></h4>
            <div className={styles.right_col}>
              <div className={styles.sideLink}>New to Interviewium? &nbsp;
                <a target="_self" className={`${styles.createLink}`} href="/signup" rel="noopener noreferrer">Create an account</a>
              </div>
            </div>
          </div>
        </div>

      </section >
    </div >
  );
}

