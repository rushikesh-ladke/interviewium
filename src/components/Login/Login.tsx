import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import G_Logo from '../../images/g_logo.svg';
import { Button, Form, Input, notification } from 'antd';
import { popup, signIn } from './login-api';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';
import { saveToLocalStorage } from 'shared/util';
import useAuth from 'hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth }: any = useAuth();
  const getDataAndStoreToLocalStorage = (user: any) => {
    console.log(user);
    const save = {
      accessToken: user.accessToken,
      uid: user.uid,
      user: JSON.stringify({
        email: user.email,
        displayName: user.displayName,
        metadata: user.metadata,
        photoURL: user.photoURL,
      }),
    };
    saveToLocalStorage(save);
    setAuth({ ...auth, userId: user.uid, loggedIn: true, role: 'HR' });
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
      getDataAndStoreToLocalStorage(user);
      notificationAlert.success(getUserName(user));
      navigate(PATH.ASSIGN);
    } catch (error: any) {
      notificationAlert.error(error);
    }
  };
  const signInWithPopUp = async () => {
    try {
      const signInData = await popup();
      if (signInData) {
        const { user }: any = signInData;
        getDataAndStoreToLocalStorage(user);
        notificationAlert.success(getUserName(user));
        navigate(PATH.ASSIGN);
      }
    } catch (error: any) {
      notificationAlert.error(error);
    }
  };
  const onFinish = (values: any) => {
    signInWithEmailPassword(values);
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
        <h2>Sign in to Interviewium</h2>
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
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.sh_back}>
            <h4 className={styles.forgot}>
              <a href='/forgot'>Forgot Password?</a>
            </h4>
            <div className={styles.right_col}>
              <div className={styles.sideLink}>
                New to Interviewium? &nbsp;
                <a
                  target='_self'
                  className={`${styles.createLink}`}
                  href='/signup'
                  rel='noopener noreferrer'
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
