import { Badge, Button, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import { query, collection, where, limit, getDocs } from 'firebase/firestore';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { db } from '../../shared/firebase-config';
import { PATH } from '../../constants/path';
import { BookASlot } from './modal/bookASlot';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { STATUS } from '../../constants/status';
import LinkIcon from '@mui/icons-material/Link';

export const Feedback = () => {
  const uid: any = localStorage.getItem('uid');

  const [applicationData, setApplicationData] = useState([]);
  const [bookSlotModalVisible, setBookSlotModalVisible] = useState(false);
  const [roundDetails, setRoundDetails] = useState('');
  useEffect(() => {
    getApplicationData();
  }, []);

  const getApplicationData = async () => {
    const q = query(
      collection(db, DOCUMENTS.ROUNDS),
      where('status', '!=', STATUS.ROUND_COMPLETED),
      where('intervieweeDetails.id', '==', uid),
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

  const columns: ColumnsType<any> = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <div>{record.companyDetails.companyName}</div>
      ),
    },
    {
      title: 'Auditor Name',
      dataIndex: 'auditorName',
      key: 'auditorName',
      render: (_, record: any) => (
        <div>{record.auditorDetails.auditorName}</div>
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
      title: 'Interview Round Number',
      dataIndex: 'rounds',
      key: 'rounds',
      render: (_, record: any) => (
        <Tag color='volcano'>{record.ongoingRoundData}</Tag>
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
      render: (_, record) => (
        <Space size='middle'>
          <Tooltip title='Book Your Slot'>
            <Button
              type='dashed'
              onClick={() => {
                setBookSlotModalVisible(true);
                setRoundDetails(record);
              }}
              disabled={record.interviewTimeAndDate === '' ? false : true}
            >
              <CollectionsBookmarkIcon color='info' />
            </Button>
          </Tooltip>
          <Tooltip title='Meeting Link'>
            <Button
              type='dashed'
              disabled={record.status === STATUS.BOOKED ? false : true}
            >
              <a
                href={`${record.auditorDetails.auditorMeetingLink}`}
                target='_blank'
                rel='noreferrer'
              >
                <LinkIcon color='success' />
              </a>
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={styles.appBody}>
        {bookSlotModalVisible && (
          <BookASlot
            isModalVisible={bookSlotModalVisible}
            setIsModalVisible={setBookSlotModalVisible}
            roundDetails={roundDetails}
          />
        )}
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
          <Table
            columns={columns}
            dataSource={applicationData}
            bordered
            rowKey='id'
          />
        </div>
      </div>
    </>
  );
};
