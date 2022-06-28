import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from '../../Sidebar/styles.module.scss';
// import { addProfileData } from '../sidebar-api';
import { getSingleDocument } from '../../../functions/getUserProfile';
import useAuth from '../../../hooks/useAuth';
import { PATH } from '../../../constants/path';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { ROLES } from '../../../constants/roles';
import { addProfileData } from '../profile-api';

export const InitialProfileData = (props: any) => {
  const ModalAntd: any = Modal;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userID: any = localStorage.getItem('uid');
  const { auth, setAuth }: any = useAuth();

  const onFinish = async (values: any) => {
    await addProfileData(values, userID);
    const profile = await getSingleDocument(userID, DOCUMENTS.USERS);
    if (profile.loaded && profile.error === null) {
      setAuth({
        ...auth,
        profile: profile?.data,
      });
    } else {
      navigate(PATH.LOGIN);
    }
    form.resetFields();
  };

  return (
    <div>
      <ModalAntd
        title='Personal Profile'
        visible={props?.isModalVisible}
        onCancel={() => props?.setInitialProfileModalVisible()}
        footer={null}
      >
        <Form
          name='profile_data'
          className='login-form'
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
                initialValue={props?.profileData?.profile?.firstName}
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
                initialValue={props?.profileData?.profile?.lastName}
              >
                <Input
                  className={styles.form_control}
                  placeholder='Last Name'
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name='position'
            rules={[
              {
                required: true,
                message: 'Please enter your Current Position!',
              },
              { min: 3, message: 'Please enter more than 3 characters' },
            ]}
            hasFeedback
            initialValue={props?.profileData?.currentPosition}
          >
            <Input
              className={styles.form_control}
              placeholder='Current Position'
            />
          </Form.Item>
          <Form.Item
            name='location'
            rules={[
              { required: true, message: 'Please input your Address!' },
              { min: 5, message: 'Please enter more than 5 characters' },
            ]}
            hasFeedback
            initialValue={props?.profileData?.profile?.location}
          >
            <Input
              className={styles.form_control}
              placeholder='Current Address'
            />
          </Form.Item>
          <Form.Item
            name='contact'
            rules={[
              { min: 10, message: 'Minimum 10 characters Required' },
              { max: 10, message: 'Maximum 10 characters Required' },
            ]}
            hasFeedback
            initialValue={props?.profileData?.profile?.contact}
          >
            <Input
              className={styles.form_control}
              placeholder='Contact Number'
            />
          </Form.Item>
          <Form.Item
            name='linkedinURL'
            rules={[
              {
                required: true,
                message: 'Please enter your Linkedin Profile URL!',
              },
              { min: 3, message: 'Please enter more than 3 characters' },
              { type: 'url', message: 'Please enter valid URL' },
            ]}
            hasFeedback
            initialValue={props?.profileData?.links?.linkedin}
          >
            <Input
              className={styles.form_control}
              placeholder='Linkedin Profile URL'
            />
          </Form.Item>
          {auth?.profile?.role !== ROLES.INTERVIEWEE && (
            <Form.Item
              name='meetingLink'
              rules={[
                {
                  required: true,
                  message: 'Please enter your meetingLink',
                },
                { min: 3, message: 'Please enter more than 3 characters' },
                { type: 'url', message: 'Please enter valid URL' },
              ]}
              hasFeedback
              initialValue={props?.profileData?.links?.meetingLink}
            >
              <Input
                className={styles.form_control}
                placeholder='Meet/Zoom Joining Link'
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button className={styles.signBtn} htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </ModalAntd>
    </div>
  );
};
