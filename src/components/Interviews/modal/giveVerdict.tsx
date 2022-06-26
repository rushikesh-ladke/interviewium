import React from 'react';
import { Button, Form, Input, Modal, Segmented, Typography, Tag } from 'antd';
import { STATUS, VERDICT } from '../../../constants/status';
import styles from '../../Sidebar/styles.module.scss';
import { updateDocument } from '../../../functions/updateDoc';
import { DOCUMENTS } from '../../../constants/firebase-docs';

export const GiveVerdict = (props: any) => {
  const ModalAntd: any = Modal;
  const [form] = Form.useForm();
  const { Text } = Typography;

  const onFinish = (fieldsValue: any) => {
    updateDocument(DOCUMENTS.ROUNDS, props.roundDetails.id, {
      ...fieldsValue,
      status: STATUS.ROUND_COMPLETED,
    });
    updateDocument(DOCUMENTS.INTERVIEWS, props.roundDetails.interviewId, {
      status: STATUS.STALE,
    });
    props?.setIsModalVisible(false);
  };

  return (
    <div>
      <ModalAntd
        title='Evaluator Verdict'
        visible={props?.isModalVisible}
        onCancel={() => {
          props?.setIsModalVisible(false);
        }}
        footer={null}
      >
        <Form
          name='profile_data'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <div className='row'>
            <Form.Item
              name='interviewerReviewForHR'
              rules={[
                {
                  required: true,
                  message: 'Please enter your Review for HR',
                },
                {
                  min: 10,
                  message: 'Please enter more than 10 characters',
                },
              ]}
              hasFeedback
            >
              <Input.TextArea placeholder='Feedback for HR' />
            </Form.Item>
            <Form.Item
              name='interviewerReviewForInterviewee'
              rules={[
                {
                  required: true,
                  message: 'Please enter Feedback to be seen by Interviewee',
                },
                {
                  min: 3,
                  message: 'Please enter more than 3 characters',
                },
              ]}
              hasFeedback
            >
              <Input.TextArea placeholder='Feedback for Interviewee' />
            </Form.Item>

            <div className='d-flex justify-content-center'>
              <Form.Item
                name='interviewerVerdict'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Feedback to be seen by Interviewee',
                  },
                ]}
                hasFeedback
              >
                <Segmented
                  defaultValue=''
                  options={[
                    {
                      label: (
                        <div style={{ padding: 4 }}>
                          <div>Candidate</div>
                          <Tag color='green'>Accepted</Tag>
                        </div>
                      ),
                      value: `${VERDICT.ACCEPTED}`,
                    },
                    {
                      label: (
                        <div style={{ padding: 4 }}>
                          <div>Candidate</div>
                          <Tag color='red'>Rejected</Tag>
                        </div>
                      ),
                      value: `${VERDICT.REJECTED}`,
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button className={styles.signBtn} htmlType='submit'>
              Publish
            </Button>
          </Form.Item>
        </Form>
        <Text type='danger'>Once Published the Verdict cannot be changed</Text>
        <br />
        <Text mark>
          Note : Interviewee Feedback and Verdict will be visible to Candidate
          once HR publishes it{' '}
        </Text>
      </ModalAntd>
    </div>
  );
};
