import { Space, Table, Tag, Tabs, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { STATUS } from '../../constants/status';
import { updateStatus } from './ongoing-interview-api';

export const OngoingInterviews = () => {
  const { TabPane } = Tabs;
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);
  const [candidateRequests, setCandidateRequests] = useState<any>([]);

  useEffect(() => {
    getCandidateRequests();
  }, []);

  const getCandidateRequests = async () => {
    const companyId = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEW),
      where('active', '==', true),
      where('companyId', '==', companyId),
      where('status', '==', STATUS.REQUEST)
    );

    const querySnapshot = await getDocs(q);
    const requests: any = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      requests.push({
        ...data,
        ...data.intervieweeDetails,
        id: doc.id,
      });
    });
    setCandidateRequests(requests);
  };

  const confirmAccept: any = (id: any) => {
    updateStatus(STATUS.ASSIGN, id);
    getCandidateRequests();
  };
  const confirmReject: any = (id: any) => {
    updateStatus(STATUS.REJECTED, id);
    getCandidateRequests();
  };

  const cancel: any = (e: any) => {};

  const candidateRequestColumns: ColumnsType<DataType> = [
    {
      title: 'Job Position',
      dataIndex: 'jobPost',
      key: 'jobPost',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size='middle'>
          <Popconfirm
            title='Accept The Candidate?'
            onConfirm={() => confirmAccept(record.id)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            {' '}
            <Button type='primary'> Accept</Button>
          </Popconfirm>
          <Popconfirm
            title='Reject The Candidate?'
            onConfirm={() => confirmReject(record.id)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              {' '}
              Reject
            </Button>
          </Popconfirm>
        </Space>
      ),
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
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Ongoing Interviews' key='1'>
              <Table columns={ongoingInterviewColumns} dataSource={data} />
            </TabPane>
            <TabPane tab='Candidates Requests' key='2'>
              <Table
                columns={candidateRequestColumns}
                dataSource={candidateRequests}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const ongoingInterviewColumns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href='/'>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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
        <a href='/'>Invite {record.name}</a>
        <a href='/'>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
