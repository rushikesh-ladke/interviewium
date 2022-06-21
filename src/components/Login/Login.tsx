import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import G_Logo from '../../images/g_logo.svg';
import { Button, Form, Input, notification } from 'antd';
import { checkUserExist, popup, signIn, signUp } from './login-api';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import { saveToLocalStorage } from '../../shared/util';
import useAuth from '../../hooks/useAuth';
import { getSingleDocument } from '../../functions/getUserProfile';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { postUserDetailsOnSignUp } from '../../functions/postUserDetailsOnSignUp';
import { ROLES } from '../../constants/roles';
import { arrayUnion } from 'firebase/firestore';
import { updateDocument } from '../../functions/updateDoc';

interface LoginProps {
  title: string;
  signInPage: boolean;
}

export const Login = ({ title, signInPage }: LoginProps) => {
  const navigate = useNavigate();
  const { auth, setAuth }: any = useAuth();

  const viewedJob: any = localStorage.getItem('_application');

  const getDataAndStoreToLocalStorage = async (user: any) => {
    const userData: any = await checkUserExist(user.uid); //check if user exists in the DB

    const save = {
      accessToken: user.accessToken,
      uid: user.uid,
      role: userData ? userData.role : 'tempUser',
      user: JSON.stringify({
        email: user.email,
        displayName: user.displayName,
        metadata: user.metadata,
        photoURL: user.photoURL,
      }),
    };
    saveToLocalStorage(save);
    setAuth({
      ...auth,
      userId: user.uid,
      loggedIn: true,
      role: userData ? userData.role : 'tempUser',
    });
  };

  const notificationAlert = {
    success: (name: any) => {
      notification['success']({
        message: 'Login Success',
        description: `Hello ${name}, Hope you are having a Good Day 🎃`,
      });
    },
    error: (error: any) => {
      notification['error']({
        message: 'Something went wrong',
        description: error.message,
      });
    },
  };

  const getUserName = (user: any) => {
    try {
      return user.displayName ? user.displayName : user.email.split('@')[0];
    } catch {
      return '';
    }
  };

  const signInWithEmailPassword = async (values: any) => {
    try {
      const signInData = await signIn(values.email, values.password);
      const { user }: any = signInData;
      await getDataAndStoreToLocalStorage(user);
      notificationAlert.success(getUserName(user));
      await updateDocument(DOCUMENTS.USERS, user.uid, {
        applyJob: viewedJob ? arrayUnion(viewedJob) : [],
      });
      await getProfileData(user.uid);
      navigate(PATH.DASHBOARD);
    } catch (error) {
      notificationAlert.error(error);
    }
  };

  const signInWithPopUp = async () => {
    try {
      const signInData = await popup();
      if (signInData) {
        const { user }: any = signInData;
        await getDataAndStoreToLocalStorage(user);
        notificationAlert.success(getUserName(user));
        postUserDetailsOnSignUp(user.uid, user.email, ROLES.HR, {
          applyJob: viewedJob ? arrayUnion(viewedJob) : [],
        });
        await getProfileData(user.uid);
        navigate(PATH.DASHBOARD);
      }
    } catch (error) {
      notificationAlert.error(error);
    }
  };

  const signUpWithEmailPassword = async (values: any) => {
    try {
      const signInData = await signUp(values.email, values.password);
      // addNewUserToDB(signInData?.user?.uid, signInData?.user?.email);
      const { user }: any = signInData;
      await getDataAndStoreToLocalStorage(user);
      notificationAlert.success(getUserName(user));
      postUserDetailsOnSignUp(user.uid, user.email, ROLES.HR, {
        applyJob: viewedJob ? arrayUnion(viewedJob) : [],
      });
      navigate(PATH.SELECT_ROLE);
    } catch (error) {
      notificationAlert.error(error);
    }
  };

  const onFinish = (values: any) => {
    if (signInPage) {
      signInWithEmailPassword(values);
    } else {
      //todo : write new fuction for signup
      signUpWithEmailPassword(values);
    }
  };

  const getProfileData = async (id: any) => {
    const profile = await getSingleDocument(id, DOCUMENTS.USERS);
    if (profile.loaded && profile.error === null) {
      setAuth({
        ...auth,
        profile: profile?.data,
      });
      localStorage.setItem('_profile', JSON.stringify(profile?.data));
    } else {
      navigate(PATH.LOGIN);
    }
  };

  return (
    <div className={`${styles.main} container`}>
      <header className={styles.header}>
        <div className={styles.left_col}></div>
        <div className={styles.center_col}>
          <a
            target='_self'
            className={styles.c_link}
            href='/login'
            rel='noopener noreferrer'
          >
            <img alt='Interviewium' src={Logo} title='Interviewium' />
          </a>
        </div>
      </header>
      <section className={styles.SubBodyL}>
        <h2>{title} to Interviewium</h2>
        <div className={styles.subh}>
          We suggest using the{' '}
          <strong>email address that you use at work.</strong>
        </div>
        <div className={styles.middleA}>
          <button
            className={styles.gmail}
            id='google_login_button'
            data-qa='base_google_login_button'
            type='button'
            onClick={() => signInWithPopUp()}
          >
            <img src={G_Logo} alt='G logo' />
            <span className={styles.gLabel}>
              <span>Sign in with Google</span>
            </span>
          </button>
          <div className={styles.divider}>
            <hr className={styles.left_rule} />
            <div className={styles.L_or}>OR</div>
            <hr className={styles.right_rule} />
          </div>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter valid Email..' },
              ]}
              hasFeedback
            >
              <Input
                className={styles.form_control}
                placeholder='hello@workemail.com'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your Password..' },
                { min: 10, message: 'Minimum 10 characters Required' },
              ]}
            >
              <Input.Password
                className={styles.form_control}
                placeholder='Input password'
                type='password'
              />
            </Form.Item>
            <Form.Item>
              <Button className={styles.signBtn} htmlType='submit'>
                {signInPage ? 'Sign In' : 'Sign up'}
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.sh_back}>
            <h4 className={styles.forgot}>
              <a href={signInPage ? PATH.LOGIN : PATH.LOGIN}>
                {' '}
                {signInPage ? 'Forgot Password?' : 'Already have an account?'}
              </a>
            </h4>
            <div className={styles.right_col}>
              <div className={styles.sideLink}>
                New to Interviewium? &nbsp;
                <a
                  target='_self'
                  className={`${styles.createLink}`}
                  href={signInPage ? PATH.REGISTER : PATH.REGISTER_COMPANY}
                  rel='noopener noreferrer'
                >
                  {signInPage ? 'Create an account' : 'Register Company'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
