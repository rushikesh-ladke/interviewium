import {
  Badge,
  Button,
  Popconfirm,
  Popover,
  Space,
  Steps,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import { profile } from 'console';
import { query, collection, where, limit, getDocs } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { STATUS, OVER_ALL_STATUS } from '../../constants/status';
import { db } from '../../shared/firebase-config';
import { PATH } from '../../constants/path';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { updateDocument } from '../../functions/updateDoc';

export const Application = () => {
  const uid: any = localStorage.getItem('uid');
  const { Step } = Steps;

  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    getApplicationData();
  }, []);

  const getApplicationData = async () => {
    const q = query(
      collection(db, DOCUMENTS.INTERVIEWS),
      where('active', '==', true),
      where('intervieweeId', '==', uid),
      where('overAllStatus', '==', OVER_ALL_STATUS.ONGOING_MAIN),
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
    setApplicationData(requests);
  };

  const customDot = (dot: any, { status, index }: any) => (
    <Popover
      content={
        <span>
          step {index + 1} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const offerActionsHandler = (interviewId: any, status: any) => {
    updateDocument(DOCUMENTS.INTERVIEWS, interviewId, {
      status: status,
    });
  };

  const columns: ColumnsType<any> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <div>{record.companyDetails.companyName}</div>
      ),
    },
    {
      title: 'Job Post',
      dataIndex: 'jobPost',
      key: 'jobPost',
      render: (_, record: any) => (
        <a
          href={`${window.location.origin}${PATH.JOB_DETAILS}?id=${record.jobDetails.jobId}`}
          target='_blank'
          rel='noreferrer'
        >
          {record.jobDetails.jobPost}
        </a>
      ),
    },
    {
      title: 'Ongoing Interview Round',
      dataIndex: 'ongoingRound',
      key: 'ongoingRound',
      align: 'center',
      width: 250,
      render: (_, record: any) => {
        if (
          record.ongoingRoundData === record.totalInterviewRounds &&
          record.ongoingRoundData
        ) {
          return (
            <Tag color={'green'} key={'id'}>
              Rounds Completed
            </Tag>
          );
        } else {
          return (
            <Badge
              count={record.ongoingRoundData ? record.ongoingRoundData : '-'}
            ></Badge>
          );
        }
      },
    },
    {
      title: 'Total Interview Rounds',
      dataIndex: 'rounds',
      key: 'rounds',
      render: (_, record: any) => (
        <Badge
          count={
            record.totalInterviewRounds ? record.totalInterviewRounds : '-'
          }
        ></Badge>
      ),
      align: 'center',
      width: 250,
    },
    {
      title: 'Interview Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status, id }) => (
        <>
          <Tag color={'green'} key={id}>
            {status}
          </Tag>
          {/* {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
             
            );
          })} */}
        </>
      ),
      align: 'center',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => {
        if (record.status === STATUS.OFFERED) {
          return (
            <Space size='middle'>
              <Popconfirm
                title='Accept Offer?'
                onConfirm={() => {
                  offerActionsHandler(record.id, STATUS.OFFER_ACCEPTED);
                }}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary'> Accept</Button>
              </Popconfirm>
              <Popconfirm
                title='Reject Offer?'
                onConfirm={() => {
                  offerActionsHandler(record.id, STATUS.OFFER_REJECTED);
                }}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary' danger>
                  {' '}
                  Reject
                </Button>
              </Popconfirm>
            </Space>
          );
        } else {
          return <div>No Actions</div>;
        }
      },
    },
  ];

  return (
    <>
      <div className={styles.appBody}>
        <div className='row'>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Total Clients</h6>
              <div className={styles.innerInfo}>
                <h1>124</h1>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Members</h6>
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
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>New/Returning</h6>
              <div className={styles.innerInfo}>
                <h1>
                  <span>3</span>/23
                </h1>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Active Members</h6>
              <div className={styles.innerInfo}>
                <h1 className='d-flex align-items-end'>
                  9 <span> &nbsp;now</span>
                </h1>
                <div className={styles.proImg}>
                  <img src={ProfileImg} alt='profile' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {/* <div className={styles.tableHead}>
            <div className={styles.sech1}>
              <h4>All Customers</h4>
            </div>
          </div> */}

          <Table
            columns={columns}
            dataSource={applicationData}
            bordered
            expandable={{
              expandedRowRender: (record: any) => {
                const interviewProcess = JSON.parse(
                  record.interviewProcessData
                );
                return (
                  <Steps
                    progressDot={customDot}
                    current={record.ongoingRoundData - 1}
                    status='process'
                  >
                    {interviewProcess.rounds.map((e: any) => {
                      return (
                        <Step title={e.roundInfo} description={e.roundType} />
                      );
                    })}
                  </Steps>
                );
              },
              rowExpandable: record => record.status !== 'REQUEST',
            }}
            rowKey='id'
          />
        </div>
      </div>
    </>
  );
};
