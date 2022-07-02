import {
  Space,
  Table,
  Tag,
  Tabs,
  Button,
  Popconfirm,
  Popover,
  Typography,
  Steps,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { query, collection, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { OVER_ALL_STATUS, STATUS } from '../../constants/status';
import { updateStatus } from './ongoing-interview-api';
import { PATH } from '../../constants/path';
import { SelectInterviewType } from './modal/select-interview_type';
import { postRoundDetailsToInterview } from '../../functions/postRoundDetailsToInterview';
import { updateDocument } from '../../functions/updateDoc';

export const OngoingInterviews = () => {
  const { TabPane } = Tabs;
  let profile: any = localStorage.getItem('_profile');
  const { Text } = Typography;
  const { Step } = Steps;

  profile = JSON.parse(profile);
  const [candidateRequests, setCandidateRequests] = useState<any>([]);
  const [selectInterviewTypeModal, setSelectInterviewTypeModal] =
    useState(false);
  const [candidateViewed, setCandidateViewed] = useState();

  const [ongoingRounds, setOngoingRounds] = useState([]);
  const [offeredCandidates, setOfferedCandidates] = useState([]);
  const [offerPageFilter, setOfferPageFilter] = useState(STATUS.OFFERED);

  useEffect(() => {
    getRoundsInterviews();
  }, []);

  const getRoundsInterviews = async () => {
    const companyId = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.ROUNDS),
      where('companyDetails.companyId', '==', companyId),
      where('status', '==', STATUS.ROUND_COMPLETED),
      where('active', '==', true),
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
    setOngoingRounds(requests);
  };

  const getCandidateRequests = async () => {
    const companyId = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEWS),
      where('active', '==', true),
      where('companyDetails.companyId', '==', companyId),
      where('status', '==', STATUS.REQUEST),
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
    setCandidateRequests(requests);
  };

  const getOfferedCandidates = async (status: any) => {
    const companyId = profile.companyDetails.companyId;
    const q = query(
      collection(db, DOCUMENTS.INTERVIEWS),
      where('active', '==', true),
      where('companyDetails.companyId', '==', companyId),
      where('status', '==', status),
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
    setOfferedCandidates(requests);
  };

  const nextRoundHandler = (data: any, status: any) => {
    updateDocument(DOCUMENTS.ROUNDS, data.id, { active: false });
    const interviewData = {
      interviewerReviewForInterviewee: data.interviewerReviewForInterviewee,
      interviewerVerdict: data.interviewerVerdict,
    };
    if (data.lastRound) {
      status = STATUS.OFFERED;
    }
    postRoundDetailsToInterview(
      data.interviewId,
      DOCUMENTS.INTERVIEWS,
      interviewData,
      status,
      data.lastRound
    );
  };

  const confirmReject: any = (id: any) => {
    const rejectedInterviewData = {
      status: STATUS.REJECTED,
      HRComments:
        'Sorry, we cannot Accept the your Application as of now. Thank you for applying',
      overAllStatus: OVER_ALL_STATUS.COMPLETED_MAIN,
    };
    updateStatus(rejectedInterviewData, id);
    getCandidateRequests();
  };

  const cancel: any = (e: any) => {};

  const ongoingInterviewColumns: ColumnsType<DataType> = [
    {
      title: 'Job Position',
      dataIndex: 'jobPost',
      key: 'jobPost',
      render: (_, record: any) => (
        <a
          href={`${window.location.origin}${PATH.JOB_DETAILS}?id=${record.jobDetails.jobId}`}
          target='_blank'
          rel='noreferrer'
        >
          {record?.jobDetails?.jobPost}
        </a>
      ),
    },
    {
      title: 'Interviewee Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <strong>
          <a
            href={`${window.location.origin}${PATH.INTERVIEWEE_DETAILS}?id=${record.intervieweeId}`}
            target='_blank'
            rel='noreferrer'
          >
            {record?.intervieweeDetails?.intervieweeName}
          </a>
        </strong>
      ),
    },
    {
      title: 'Auditor Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <strong>
          <span>{record.auditorDetails.auditorName}</span>
        </strong>
      ),
    },
    {
      title: 'Ongoing Round',
      dataIndex: 'email',
      key: 'email',
      render: (_, record: any) => (
        <Tag color='lime'>{record.ongoingRoundData}</Tag>
      ),
      align: 'center',
    },
    {
      title: 'Verdict',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record: any) => (
        <>
          {' '}
          <Popover
            content={
              <div style={{ width: 300 }}>
                <Text code>Review For HR</Text>
                {record.interviewerReviewForHR}
                <br />
                <Text code>Review For Interviewee</Text>
                <Text type='secondary'>
                  {record.interviewerReviewForInterviewee}
                </Text>
              </div>
            }
            title={<Tag color='volcano'>{record.interviewerVerdict}</Tag>}
          >
            <Tag color='volcano'>{record.interviewerVerdict}</Tag>
          </Popover>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size='middle'>
          <Popconfirm
            title={
              record.lastRound
                ? 'Publish Verdict and Move to Offered stage'
                : 'Publish Verdict and Move to Next Round?'
            }
            onConfirm={() => nextRoundHandler(record, STATUS.ASSIGN)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary'>Move to next Round</Button>
          </Popconfirm>
          <Popconfirm
            title='Publish Verdict and Send a thank you note?'
            onConfirm={() => nextRoundHandler(record, STATUS.REJECTED)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              {' '}
              Tq for Applying
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const candidateRequestColumns: ColumnsType<DataType> = [
    {
      title: 'Job Position',
      dataIndex: 'jobPost',
      key: 'jobPost',
      render: (_, record: any) => (
        <a
          href={`${window.location.origin}${PATH.JOB_DETAILS}?id=${record.jobDetails.jobId}`}
          target='_blank'
          rel='noreferrer'
        >
          {record?.jobDetails?.jobPost}
        </a>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <strong>
          <a
            href={`${window.location.origin}${PATH.INTERVIEWEE_DETAILS}?id=${record.intervieweeId}`}
            target='_blank'
            rel='noreferrer'
          >
            {record?.intervieweeDetails?.intervieweeName}
          </a>
        </strong>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, record: any) => (
        <a
          href={`mailto:${record?.intervieweeDetails?.intervieweeEmail}`}
          target='_blank'
          rel='noreferrer'
        >
          {record?.intervieweeDetails?.intervieweeEmail}
        </a>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record: any) => (
        <a href={`tel:${record?.intervieweeDetails?.intervieweeContact}`}>
          {record?.intervieweeDetails?.intervieweeContact}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size='middle'>
          <Button
            type='primary'
            onClick={() => {
              setSelectInterviewTypeModal(true);
              setCandidateViewed(record);
            }}
          >
            {' '}
            Accept
          </Button>
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
  const offeredRequestColumns: ColumnsType<any> = [
    {
      title: 'Job Position',
      dataIndex: 'jobPost',
      key: 'jobPost',
      render: (_, record: any) => (
        <a
          href={`${window.location.origin}${PATH.JOB_DETAILS}?id=${record.jobDetails.jobId}`}
          target='_blank'
          rel='noreferrer'
        >
          {record?.jobDetails?.jobPost}
        </a>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: any) => (
        <strong>
          <a
            href={`${window.location.origin}${PATH.INTERVIEWEE_DETAILS}?id=${record.intervieweeId}`}
            target='_blank'
            rel='noreferrer'
          >
            {record?.intervieweeDetails?.intervieweeName}
          </a>
        </strong>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: any) => <Tag color='lime'>{record.status}</Tag>,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record: any) => (
        <a href={`tel:${record?.intervieweeDetails?.intervieweeContact}`}>
          {record?.intervieweeDetails?.intervieweeContact}
        </a>
      ),
    },
  ];

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

  const offeredPageFIltersHandler = (filter: any) => {
    getOfferedCandidates(filter);
    setOfferPageFilter(filter);
  };

  const onChangeTabsHandler = (values: any) => {
    if (values === '1') {
      getRoundsInterviews();
    }
    if (values === '2') {
    } else if (values === '3') {
      getCandidateRequests();
    } else if (values === '4') {
      getOfferedCandidates(`${STATUS.OFFERED}`);
    }
    console.log(values);
  };

  return (
    <>
      <div className={styles.appBody}>
        {/* <div className='row'>
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
        </div> */}
        <div className={styles.cards}>
          {/* <div className={styles.tableHead}>
            <div className={styles.sech1}>
              <h4>All Customers</h4>
            </div>
          </div> */}
          <Tabs defaultActiveKey='1' centered onChange={onChangeTabsHandler}>
            <TabPane tab='Interview Rounds' key='1'>
              <Table
                columns={ongoingInterviewColumns}
                dataSource={ongoingRounds}
              />
            </TabPane>
            <TabPane tab='Ongoing Interviews' key='2'>
              <Table
                columns={candidateRequestColumns}
                dataSource={ongoingRounds}
              />
            </TabPane>
            <TabPane tab='Candidates Requests' key='3'>
              <Table
                columns={candidateRequestColumns}
                dataSource={candidateRequests}
              />
            </TabPane>
            <TabPane tab='Offered Requests' key='4'>
              <div>
                Filter With :{' '}
                <Tag
                  style={{ cursor: 'pointer' }}
                  color={offerPageFilter === STATUS.OFFERED ? 'red' : 'grey'}
                  onClick={() => offeredPageFIltersHandler(STATUS.OFFERED)}
                >
                  {STATUS.OFFERED}
                </Tag>
                <Tag
                  style={{ cursor: 'pointer' }}
                  color={
                    offerPageFilter === STATUS.OFFER_ACCEPTED ? 'red' : 'grey'
                  }
                  onClick={() =>
                    offeredPageFIltersHandler(STATUS.OFFER_ACCEPTED)
                  }
                >
                  {STATUS.OFFER_ACCEPTED}
                </Tag>
                <Tag
                  style={{ cursor: 'pointer' }}
                  color={
                    offerPageFilter === STATUS.OFFER_REJECTED ? 'red' : 'grey'
                  }
                  onClick={() =>
                    offeredPageFIltersHandler(STATUS.OFFER_REJECTED)
                  }
                >
                  {STATUS.OFFER_REJECTED}
                </Tag>
              </div>
              <Table
                columns={offeredRequestColumns}
                dataSource={offeredCandidates}
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
                            <Step
                              title={e.roundInfo}
                              description={e.roundType}
                            />
                          );
                        })}
                      </Steps>
                    );
                  },
                  rowExpandable: record => record.status !== 'REQUEST',
                }}
                rowKey='id'
              />
            </TabPane>
          </Tabs>
        </div>
        {selectInterviewTypeModal && (
          <SelectInterviewType
            isModalVisible={selectInterviewTypeModal}
            setIsModalVisible={setSelectInterviewTypeModal}
            candidateViewed={candidateViewed}
            getCandidateRequests={getCandidateRequests}
          />
        )}
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
