import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styles from './styles.module.scss';
import ProfileImg from '../../images/avatar.svg';
export const Interviews = () => {


  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
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
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
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


  return (
    <>
      <div className={styles.appBody}>
        <div className="row">
          <div className="col-lg-3">
            <div className={styles.cards}>
              <h6>Total Clients</h6>
              <div className={styles.innerInfo}>
                <h1>124</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className={styles.cards}>
              <h6>Members</h6>
              <div className={`${styles.innerInfo} align-items-baseline`}>
                <h1>65</h1>
                <div className={styles.dotNo}>
                  <h6 className='d-flex align-items-center'><div className={styles.dot}></div> 2</h6>
                  <h6 className='d-flex align-items-center'><div className={`${styles.dot} ${styles.dot1}`}></div> 12</h6>
                  <h6 className='d-flex align-items-center'><div className={`${styles.dot} ${styles.dot2}`}></div> 4</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className={styles.cards}>
              <h6>New/Returning</h6>
              <div className={styles.innerInfo}>
                <h1><span>3</span>/23</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className={styles.cards}>
              <h6>Active Members</h6>
              <div className={styles.innerInfo}>
                <h1 className='d-flex align-items-end'>9 <h5> &nbsp;now</h5></h1>
                <div className={styles.proImg}><img src={ProfileImg} /></div>
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
