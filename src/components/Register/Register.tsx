import { Button, Form, Input } from 'antd';

import styles from './styles.module.scss';
import Logo from '../../images/Interviewiumlogo.svg';
import { saveCompanyData } from './register-api';
import { PATH } from 'constants/path';

export const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    saveCompanyData(values);
    form.resetFields();
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
                    { min: 3, message: 'Please enter more than 3 characters' },
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
                    { required: true, message: 'Please enter your last name!' },
                    { min: 3, message: 'Please enter more than 3 characters' },
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
                { required: true, message: 'Please enter your Company name!' },
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>
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
