import React from 'react';
import { Button, Form, Input, Modal, Slider, Select } from 'antd';

import styles from '../styles.module.scss';
import { getStringifiedLocalStorageData } from '../../../shared/util';
import { addDoc, collection } from 'firebase/firestore';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { db } from '../../../shared/firebase-config';

export const Feedback = (props: any) => {
  const ModalAntd: any = Modal;
  const [form] = Form.useForm();
  const { Option } = Select;

  const profile = getStringifiedLocalStorageData('_profile');

  const onFinish = async (values: any) => {
    await addDoc(collection(db, DOCUMENTS.FEEDBACK), {
      ...values,
      role: profile.role,
      email: profile.email,
    });
  };

  return (
    <div>
      <ModalAntd
        text
        visible={props.isModalVisible}
        onOk={() => props.feedbackHandler()}
        onCancel={() => props.handleCancel()}
        className={styles.FeedbackModal}
      >
        <h5>
          <strong>Give feedback</strong>
        </h5>
        <p>What do you think of the management tool?</p>
        <Form
          name='feedback'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name='type'
            rules={[{ required: true, message: 'required' }]}
            hasFeedback
          >
            <Select defaultValue='' style={{ width: '100%' }}>
              <Option value='feedback'>Feedback</Option>
              <Option value='bug'>Bug</Option>
              <Option value='featureRequest'>Feature Request</Option>
            </Select>
          </Form.Item>
          <Form.Item name='rating'>
            <Slider min={1} max={13} />
          </Form.Item>
          <Form.Item
            name='location'
            rules={[
              { required: true, message: 'Please input your Address!' },
              { min: 10, message: 'Please enter more than 5 characters' },
            ]}
            hasFeedback
          >
            <Input.TextArea placeholder='Please Enter Feedback here' />
          </Form.Item>
          <Form.Item
            name='request'
            rules={[{ required: true, message: 'required' }]}
            hasFeedback
          >
            <Select defaultValue='' style={{ width: '100%' }}>
              <Option value='mail'>Request For a follow-up mail</Option>
              <Option value='noMail'>No need of follow-up mail</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className={styles.signBtn} htmlType='submit'>
              Send
            </Button>
          </Form.Item>
        </Form>
      </ModalAntd>
    </div>
  );
};
