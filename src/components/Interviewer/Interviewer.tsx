import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { query, collection, where, getDocs, limit } from 'firebase/firestore';

import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import { db } from '../../shared/firebase-config';
import { signUp } from '../Login/login-api';
import { ROLES } from '../../constants/roles';
import { postUserDetailsOnSignUp } from '../../functions/postUserDetailsOnSignUp';
import useAuth from '../../hooks/useAuth';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { STATUS } from '../../constants/status';
import { getStringifiedLocalStorageData } from '../../shared/util';

export const Interviewer = () => {
  const [form] = Form.useForm();
  const [HRform] = Form.useForm();
  const { auth }: any = useAuth();
  const userID: any = localStorage.getItem('uid');
  const profile = getStringifiedLocalStorageData('_profile');

  const [associates, setAssociates] = useState([]);
  const [associate, setAssociate] = useState('');
  const [addInterviewer, setAddInterviewer] = useState(false);
  const [interviewerStatus, setInterviewerStatus] = useState('');

  const [addHRs, setAddHRs] = useState(false);
  const [HRStatus, setHRStatus] = useState('');

  useEffect(() => {
    getInterviewerData();
  }, []);

  const getInterviewerData = async () => {
    const q = query(
      collection(db, DOCUMENTS.USERS),
      where(
        'companyDetails.companyId',
        '==',
        profile?.companyDetails?.companyId
      ),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const requests: any = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      requests.push({
        ...data,
        id: doc.id,
      });
    });
    setAssociates(requests);
    console.log(requests);
  };

  const addAssociateHandler = async (
    role: any,
    statusHandler: any,
    form: any
  ) => {
    try {
      const signInData = await signUp(associate, 'Jarvis@668');
      const { user }: any = signInData;
      if (user.uid) {
        statusHandler(`${role} Added`);
        setTimeout(() => {
          statusHandler('');
          form.resetFields();
        }, 1000);
        postUserDetailsOnSignUp(user.uid, associate, role, {
          companyDetails: {
            companyId: auth?.profile?.companyDetails?.companyId
              ? auth?.profile?.companyDetails?.companyId
              : '',
          },
          HRid: userID,
        });
      }
      getInterviewerData();
    } catch (error: any) {
      statusHandler('Email Already Exists');
      setTimeout(() => {
        statusHandler('');
        form.resetFields();
      }, 2000);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <strong>
          {record?.profile?.firstName ? record?.profile?.firstName : '-'}{' '}
          {record?.profile?.lastName}
        </strong>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record: any) => <div>{record?.email}</div>,
    },
    {
      title: 'Current Position',
      dataIndex: 'currentPosition',
      key: 'currentPosition',
      render: (_, record: any) => (
        <div>{record?.currentPosition ? record?.currentPosition : '-'}</div>
      ),
    },
    {
      title: 'Portal Role',
      dataIndex: 'portalRole',
      key: 'portalRole',
      render: (_, record: any) => <div>{record?.role}</div>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_, record: any) => (
        <Tag color='green'>{record?.active ? 'Active' : 'Idle'}</Tag>
      ),
      align: 'center',
    },
    {
      title: 'On Boarding',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record: any) => (
        <Tag color='green'>{record?.ON_BOARDED ? 'Done' : 'Waiting'}</Tag>
      ),
    },
  ];

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
                      color={
                        HRStatus === `${ROLES.HR} Added` ? 'green' : 'pink'
                      }
                    >
                      <div className='d-flex flex-column'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          initialValues={{ remember: true }}
                          onFinish={() =>
                            addAssociateHandler(ROLES.HR, setHRStatus, HRform)
                          }
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
                                setAssociate(e.target.value);
                              }}
                              value={associate}
                            ></Input>
                          </Form.Item>
                          <Form.Item>
                            <Button type='primary' block htmlType='submit'>
                              Add HR
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
                        interviewerStatus === `${ROLES.INTERVIEWER} Added`
                          ? 'green'
                          : 'pink'
                      }
                    >
                      <div className='d-flex flex-column'>
                        <Form
                          name='normal_login'
                          className='login-form'
                          initialValues={{ remember: true }}
                          onFinish={() =>
                            addAssociateHandler(
                              ROLES.INTERVIEWER,
                              setInterviewerStatus,
                              form
                            )
                          }
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
                                setAssociate(e.target.value);
                              }}
                              value={associate}
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
          <Table columns={columns} dataSource={associates} />
        </div>
      </div>
    </>
  );
};
