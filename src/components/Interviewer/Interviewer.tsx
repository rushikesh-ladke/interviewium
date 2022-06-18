import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { query, collection, where, getDocs } from 'firebase/firestore';

import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import { db } from '../../shared/firebase-config';
import { signUp } from '../Login/login-api';

export const Interviewer = () => {
  const [form] = Form.useForm();
  const [HRform] = Form.useForm();
  const userID: any = localStorage.getItem('uid');

  const [interviewers, setinterviewers] = useState([]);
  const [interviewer, setInterviewer] = useState('');
  const [addInterviewer, setAddInterviewer] = useState(false);
  const [interviewerStatus, setInterviewerStatus] = useState('');

  const [addHRs, setAddHRs] = useState(false);
  const [HRStatus, setHRStatus] = useState('');

  useEffect(() => {
    getInterviewerData();
  }, []);

  const getInterviewerData = () => {
    const q = query(
      collection(db, 'interviewers'),
      where('active', '==', true),
      where('HRid', '==', userID)
    );

    const interviewers: any = [];
    getDocs(q).then(snapshot => {
      snapshot.forEach((doc: any) => {
        interviewers.push({ ...doc.data(), id: doc.id });
      });
      console.log(interviewers);
      setinterviewers(interviewers);
    });
  };

  const addInterviewerHandler = async () => {
    try {
      const signInData = await signUp(interviewer, 'Jarvis@668');
      const { user }: any = signInData;
      if (user.uid) {
        setInterviewerStatus('Interviewer Added');
        setTimeout(() => {
          setInterviewerStatus('');
          form.resetFields();
        }, 1000);
      }
    } catch (error: any) {
      setInterviewerStatus('Email Already Exists');
      setTimeout(() => {
        setInterviewerStatus('');
        form.resetFields();
      }, 2000);
    }
  };

  return (
    <>
      <div className={styles.appBody}>
        <div className='row'>
          {/* HR Summary */}
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Human Resource</h6>
              <div className={`${styles.innerInfo} align-items-baseline`}>
                <h1>65</h1>
                <div className={styles.dotNo}>
                  <h6 className='d-flex align-items-center'>
                    <div className={styles.dot}></div> 2
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot1}`}></div> 12
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot2}`}></div> 4
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {/* add HR */}
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <div className='d-flex justify-content-between'>
                <h6>Add New HRs</h6>
                {addHRs ? (
                  <span
                    onClick={() => {
                      setAddHRs(!addHRs);
                      setHRStatus('');
                    }}
                  >
                    <CloseIcon color='error' />{' '}
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setAddHRs(!addHRs);
                    }}
                  >
                    <AddIcon color='success' />{' '}
                  </span>
                )}
              </div>
              <div className={styles.innerInfo}>
                <div className='d-flex align-items-end'>
                  {addHRs && (
                    <Badge.Ribbon
                      text={HRStatus}
                      color={HRStatus === 'HR Added' ? 'green' : 'pink'}
                    >
                      <div className='d-flex flex-column'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          initialValues={{ remember: true }}
                          onFinish={addInterviewerHandler}
                          form={HRform}
                        >
                          <Form.Item
                            name='email'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Email!',
                              },
                              {
                                type: 'email',
                                message: 'Please enter valid Email..',
                              },
                            ]}
                            hasFeedback
                          >
                            <Input
                              style={{ width: 260, margin: 5 }}
                              placeholder='please enter email'
                              onChange={(e: any) => {
                                setInterviewer(e.target.value);
                              }}
                              value={interviewer}
                            ></Input>
                          </Form.Item>
                          <Form.Item>
                            <Button type='primary' block htmlType='submit'>
                              Add Interviewer
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </Badge.Ribbon>
                  )}
                </div>
                {!addHRs && (
                  <div className={styles.proImg}>
                    <img src={ProfileImg} alt='profile' />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Add interviewer */}
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <div className='d-flex justify-content-between'>
                <h6>Add New Interviewers</h6>
                {addInterviewer ? (
                  <span
                    onClick={() => {
                      setAddInterviewer(!addInterviewer);
                      setInterviewerStatus('');
                    }}
                  >
                    <CloseIcon color='error' />{' '}
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setAddInterviewer(!addInterviewer);
                    }}
                  >
                    <AddIcon color='success' />{' '}
                  </span>
                )}
              </div>
              <div className={styles.innerInfo}>
                <div className='d-flex align-items-end'>
                  {addInterviewer && (
                    <Badge.Ribbon
                      text={interviewerStatus}
                      color={
                        interviewerStatus === 'Interviewer Added'
                          ? 'green'
                          : 'pink'
                      }
                    >
                      <div className='d-flex flex-column'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          initialValues={{ remember: true }}
                          onFinish={addInterviewerHandler}
                          form={form}
                        >
                          <Form.Item
                            name='email'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Email!',
                              },
                              {
                                type: 'email',
                                message: 'Please enter valid Email..',
                              },
                            ]}
                            hasFeedback
                          >
                            <Input
                              style={{ width: 260, margin: 5 }}
                              placeholder='please enter email'
                              onChange={(e: any) => {
                                setInterviewer(e.target.value);
                              }}
                              value={interviewer}
                            ></Input>
                          </Form.Item>
                          <Form.Item>
                            <Button type='primary' block htmlType='submit'>
                              Add Interviewer
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </Badge.Ribbon>
                  )}
                </div>
                {!addInterviewer && (
                  <div className={styles.proImg}>
                    <img src={ProfileImg} alt='profile' />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* interviewer summary */}
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Human Resource</h6>
              <div className={`${styles.innerInfo} align-items-baseline`}>
                <h1>65</h1>
                <div className={styles.dotNo}>
                  <h6 className='d-flex align-items-center'>
                    <div className={styles.dot}></div> 2
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot1}`}></div> 12
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot2}`}></div> 4
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          <Table columns={columns} dataSource={interviewers} />
        </div>
      </div>
    </>
  );
};

interface DataType {
  key: string;
  name: string;
  status: string;
  slots: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href='/'>{text}</a>,
  },
  {
    title: 'Todays Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Slots',
    dataIndex: 'slots',
    key: 'slots',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a href='/'>Invite</a>
        <a href='/'>Delete</a>
      </Space>
    ),
  },
];
