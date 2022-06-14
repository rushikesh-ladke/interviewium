import { AutoComplete, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
export const Interviewer = () => {
  const { Option } = AutoComplete;

  const [result, setResult] = useState<string[]>([]);
  const [addInterviewer, setAddInterviewer] = useState(false);

  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['interviewium.com', 'interviewium.in', 'interviewium.co'].map(
        domain => `${value}@${domain}`
      );
    }
    setResult(res);
  };

  return (
    <>
      <div className={styles.appBody}>
        <div className='row'>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Total Interviewers</h6>
              <div className={styles.innerInfo}>
                <h1>124</h1>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Active</h6>
              <div className={`${styles.innerInfo} align-items-baseline`}>
                <h1>65</h1>
                {/* <div className={styles.dotNo}>
                  <h6 className='d-flex align-items-center'>
                    <div className={styles.dot}></div> 2
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot1}`}></div> 12
                  </h6>
                  <h6 className='d-flex align-items-center'>
                    <div className={`${styles.dot} ${styles.dot2}`}></div> 4
                  </h6>
                </div> */}
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <h6>Invited</h6>
              <div className={styles.innerInfo}>
                <h1>
                  <span>3</span>/23
                </h1>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className={styles.cards}>
              <div className='d-flex justify-content-between'>
                <h6>Add New Interviewers</h6>
                {addInterviewer ? (
                  <span
                    onClick={() => {
                      setAddInterviewer(!addInterviewer);
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
                    <AutoComplete
                      style={{ width: 260 }}
                      onSearch={handleSearch}
                      placeholder='input here'
                    >
                      {result.map((email: string) => (
                        <Option key={email} value={email}>
                          {email}
                        </Option>
                      ))}
                    </AutoComplete>
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
        </div>
        <div className={styles.cards}>
          {/* <div className={styles.tableHead}>
            <div className={styles.sech1}>
              <h4>All Customers</h4>
            </div>
          </div> */}

          <Table columns={columns} dataSource={data} />
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
    status: 'Active',
    slots: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    status: 'Do not disturb',
    slots: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    status: 'Busy',
    slots: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
