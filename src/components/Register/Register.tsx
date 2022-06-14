import { Button, Form, Input, notification } from 'antd';

import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import { saveCompanyData, addAditionalData } from './register-api';
import { PATH } from '../../constants/path';
import { useState } from 'react';
import { checkUserExist } from '../Login/login-api';
import { saveToLocalStorage } from '../../shared/util';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [notificationMessage, setnotificationMessage] = useState(true);
  const [newDocId, setNewDocId] = useState('');
  const [userDetails, setUserDetails] = useState();
  const { auth, setAuth }: any = useAuth();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [companyInfo] = Form.useForm();

  const getDataAndStoreToLocalStorage = async (user: any) => {
    console.log(user);

    const save = {
      accessToken: user.accessToken,
      uid: user.uid,
      role: 'HR',
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
      role: 'HR',
    });
  };

  const onFinish = async (values: any) => {
    console.log(values);
    const { alert, message, doc, user }: any = await saveCompanyData(values);
    setNewDocId(doc);
    setUserDetails(user);
    if (alert === 'error') {
      notification['error']({
        message: 'Something went wrong',
        description: message,
      });
    } else if (alert === 'success') {
      notification['success']({
        message: 'Success',
        description: message,
      });
      setnotificationMessage(false);
    }
    form.resetFields();
  };

  const onSubmitCompanyInfo = async (values: any) => {
    await addAditionalData(values, newDocId);
    form.resetFields();
    getDataAndStoreToLocalStorage(userDetails);
    navigate(PATH.DASHBOARD);
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
        <h2>Sign up to Interviewium</h2>
        <div className={styles.subh}>
          We suggest using the{' '}
          <strong>email address that you use at work.</strong>
        </div>
        <div className={styles.middleA}>
          {/* @note Tobe enabled when HR signup can be done with Google */}
          {/* <button className={styles.gmail} id="google_login_button" data-qa="base_google_login_button" type="button">
            <img src={G_Logo} alt="G logo" /><span className={styles.gLabel}><span>Sign up with Google</span></span>
          </button>
          <div className={styles.divider}>
            <hr className={styles.left_rule} />
            <div className={styles.L_or}>OR</div>
            <hr className={styles.right_rule} />
          </div> */}
          {notificationMessage ? (
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
            >
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <Form.Item
                    name='firstName'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your first name!',
                      },
                      {
                        min: 3,
                        message: 'Please enter more than 3 characters',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      className={styles.form_control}
                      placeholder='First Name'
                    />
                  </Form.Item>
                </div>
                <div className='col-12 col-sm-6'>
                  <Form.Item
                    name='lastName'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your last name!',
                      },
                      {
                        min: 3,
                        message: 'Please enter more than 3 characters',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      className={styles.form_control}
                      placeholder='Last Name'
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name='companyName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Company name!',
                  },
                  { min: 3, message: 'Please enter more than 3 characters' },
                ]}
                hasFeedback
              >
                <Input
                  className={styles.form_control}
                  placeholder='Company Name'
                />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  { type: 'email', message: 'Please enter valid Email..' },
                ]}
                hasFeedback
              >
                <Input className={styles.form_control} placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your Password..' },
                  { min: 10, message: 'Minimum 10 characters Required' },
                ]}
                hasFeedback
              >
                <Input.Password
                  className={styles.form_control}
                  placeholder='Input password'
                />
              </Form.Item>
              <Form.Item>
                <Button className={styles.signBtn} htmlType='submit'>
                  Next
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{ remember: true }}
              onFinish={onSubmitCompanyInfo}
              form={companyInfo}
            >
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <Form.Item
                    name='location'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Country Name',
                      },
                      {
                        min: 2,
                        message: 'Please enter more than 3 characters',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      className={styles.form_control}
                      placeholder='Country Name'
                    />
                  </Form.Item>
                </div>
                <div className='col-12 col-sm-6'>
                  <Form.Item
                    name='timezone'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Timezone!',
                      },
                      {
                        min: 3,
                        message: 'Please enter more than 3 characters',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      className={styles.form_control}
                      placeholder='Timezone'
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name='companyDomain'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Company Domain!',
                  },
                  { min: 3, message: 'Please enter more than 3 characters' },
                  { type: 'url', message: 'Please enter valid URL' },
                ]}
                hasFeedback
              >
                <Input
                  className={styles.form_control}
                  placeholder='Company Domain'
                />
              </Form.Item>
              <Form.Item
                name='workspaceName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Workspace Name!',
                  },
                  { min: 3, message: 'Please enter more than 3 characters' },
                ]}
                hasFeedback
              >
                <Input
                  className={styles.form_control}
                  placeholder='Workspace Name'
                />
              </Form.Item>
              <Form.Item
                name='contact'
                rules={[
                  { min: 10, message: 'Minimum 10 characters Required' },
                  { max: 10, message: 'Maximum 10 characters Required' },
                ]}
                hasFeedback
              >
                <Input
                  className={styles.form_control}
                  placeholder='Contact Number'
                />
              </Form.Item>
              <Form.Item>
                <Button className={styles.signBtn} htmlType='submit'>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          )}
          <div className={styles.sh_back}>
            <div className={styles.right_col}>
              <div className={styles.sideLink}>
                Already using Interviewium?
                <br />
                <a
                  target='_self'
                  className={`${styles.createLink}`}
                  href={PATH.LOGIN}
                  rel='noopener noreferrer'
                >
                  Sign in to an existing workspace
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
function setAuth(arg0: any) {
  throw new Error('Function not implemented.');
}
