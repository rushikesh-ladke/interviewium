import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import G_Logo from '../../images/company.png';
import { Badge, Tag, Segmented, Popover, Button } from 'antd';
import { CreateJob } from './modal/createJob';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';
import { PATH } from '../../constants/path';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
export const Jobs = () => {
  const userID: any = localStorage.getItem('uid');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [jobDetails, setjobDetails] = useState<any>(null);
  const [sortValue, setSortValue] = useState<string | number>('Asc');
  const [showSort, setShowSort] = useState(true);
  const [fixedFilter, setFixedFilter] = useState('');
  const [search, setSearch] = useState('');
  const [editJob, seteditJob] = useState<any>();

  useEffect(() => {
    getJobsData({ field: 'details.updatedAt', value: 'asc' }, 'plain');
  }, []);

  const fixedFilters = [
    {
      name: 'Job Type : Full-Time',
      id: 'fullTime',
      filterField: 'jobType',
      filterValue: 'Full-time',
    },
    {
      name: 'Workspace Type : Office',
      id: 'office',
      filterField: 'workspaceType',
      filterValue: 'Office',
    },
    {
      name: 'Remote',
      id: 'remote',
      filterField: 'workspaceType',
      filterValue: 'Remote',
    },
  ];

  const getJobsData = async (order: any, reqQuery: any) => {
    let q: any;
    if (reqQuery === 'plain') {
      setFixedFilter('');
      q = query(
        collection(db, 'jobs'),
        where('active', '==', true),
        where('HRDetails.HRid', '==', userID)
      );
    } else if (reqQuery === 'withoutOrder') {
      setSortValue('Asc');
      if (order.field === 'position' && order.value === '') return;
      q = query(
        collection(db, 'jobs'),
        where('active', '==', true),
        where('HRDetails.HRid', '==', userID)
      );
    }
    const jobs: any = [];
    getDocs(q).then(snapshot => {
      snapshot.forEach((doc: any) => {
        jobs.push({ ...doc.data(), id: doc.id });
      });
      setJobsData(jobs);
      if (jobs.length > 0) {
        setjobDetails(jobs[0]);
      }
    });
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const content = (jobId: any) => {
    return (
      <div>
        <Button
          type='dashed'
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.origin + `${PATH.JOB_DETAILS}?id=${jobId}`
            );
          }}
        >
          Copy Shareable Link
        </Button>
      </div>
    );
  };
  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.appBody}>
        {isModalVisible && (
          <CreateJob
            isModalVisible={isModalVisible}
            handleOk={showModal}
            handleCancel={showModal}
            data={editJob}
          />
        )}

        <div className={styles.dataBody}>
          <div className='row'>
            <div className='col-lg-8'>
              <div className={styles.middleB}>
                {/* search */}
                <div className={styles.searchD}>
                  <div className={`input-group mb-3 ${styles.searchBox}`}>
                    <input
                      type='text'
                      className={`form-control ${styles.Sinput}`}
                      placeholder='Search by Specific Position Name'
                      aria-label='Search by Specific Position Name'
                      aria-describedby='button-addon2'
                      onChange={(e: any) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                    />
                    <button
                      className={`btn ${styles.searchBtn}`}
                      type='button'
                      id='button-addon2'
                      onClick={() => {
                        getJobsData(
                          { field: 'position', value: search },
                          'withoutOrder'
                        );
                      }}
                    >
                      <SearchIcon />
                    </button>
                    <FilterAltOutlinedIcon
                      className={`${styles.filtericon}`}
                      onClick={() => {
                        getJobsData(
                          { field: 'details.updatedAt', value: 'asc' },
                          'plain'
                        );
                        setSearch('');
                      }}
                    />
                  </div>
                </div>
                {/* filter */}
                <div className={styles.filter}>
                  <div className={styles.fresult}>
                    {fixedFilters &&
                      fixedFilters.map((e: any) => {
                        return (
                          <div
                            className={`${styles.fcards} ${
                              e.id === fixedFilter ? styles.active : ''
                            }`}
                            onClick={() => {
                              getJobsData(
                                { field: e.filterField, value: e.filterValue },
                                'withoutOrder'
                              );
                              setFixedFilter(e.id);
                            }}
                            id={e.id}
                          >
                            {' '}
                            {e.name}
                          </div>
                        );
                      })}
                  </div>
                  <div
                    className={styles.cresult}
                    onClick={() =>
                      getJobsData(
                        { field: 'details.updatedAt', value: 'asc' },
                        'plain'
                      )
                    }
                  >
                    <p>Clear filters</p>
                  </div>
                </div>
                {/* sort */}
                <div className={styles.sort}>
                  {showSort && (
                    <div className={styles.sortTab}>
                      Sort:{' '}
                      <Segmented
                        options={['Asc', 'Desc']}
                        value={sortValue}
                        onChange={(e: any) => {
                          setSortValue(e);
                          let value = e;
                          if (value === 'Desc') {
                            value = 'desc';
                          } else {
                            value = 'asc';
                          }
                          getJobsData(
                            { field: 'details.updatedAt', value: value },
                            'plain'
                          );
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.twoBtn}>
                    <button
                      className={styles.NewBtn}
                      onClick={() => {
                        showModal();
                        seteditJob(null);
                      }}
                    >
                      <AddOutlinedIcon className={styles.AddIcon} />
                      New
                    </button>
                  </div>
                </div>
                {/* Main cards */}
                <div className={styles.companyList}>
                  {jobsData &&
                    jobsData.length > 0 &&
                    jobsData.map((e: any) => {
                      return (
                        <div
                          id={e.id}
                          className={styles.companyCard}
                          onClick={() => setjobDetails(e)}
                          style={{
                            border:
                              e.id === jobDetails.id ? '1px solid blue' : '',
                          }}
                        >
                          <div className='row'>
                            <div className='col-lg-1'>
                              <div className={styles.cphoto}>
                                <img
                                  alt='company Logo'
                                  src={G_Logo}
                                  width={70}
                                />
                              </div>
                            </div>
                            <div className='col-lg-8 ps-4'>
                              <div className={styles.companyI}>
                                <h4>{e?.companyDetails?.companyName}</h4>
                                <h6>
                                  {e.position}, {e?.companyDetails?.companyName}
                                </h6>
                                <div className='d-flex'>
                                  <div className={styles.Locate}>
                                    <LocationOnIcon className={styles.icon} />
                                    &nbsp;{e.location}
                                  </div>
                                  <div className={`${styles.Locate} ms-3`}>
                                    <RemoveRedEyeOutlinedIcon
                                      className={styles.icon}
                                    />
                                    &nbsp;{e.views} Views
                                  </div>
                                  <div className={`${styles.Locate} ms-3`}>
                                    <AvTimerIcon className={styles.icon} />
                                    &nbsp;{e.minExp} - {e.maxExp} Expericence
                                  </div>
                                </div>
                                <div className={styles.dot}>
                                  <Tag color='#f7cc1b'>Today</Tag> &bull;{' '}
                                  <Badge count={e.jobType} /> &bull;{' '}
                                  <Badge
                                    className='site-badge-count-109'
                                    count={e.workspaceType}
                                    style={{ backgroundColor: '#52c41a' }}
                                  />
                                  &bull;{' '}
                                  <Tag color='#7855f9'>
                                    {' '}
                                    {e.totalApplied} applied
                                  </Tag>
                                </div>
                              </div>
                            </div>
                            <div className='col-lg-3'>
                              <div className={styles.info}>
                                <div className={styles.infoI}>
                                  <AutoFixHighIcon
                                    className={styles.icon}
                                    onClick={() => {
                                      seteditJob(e);
                                      setIsModalVisible(true);
                                    }}
                                  />
                                  <Popover content={() => content(e.id)}>
                                    <InfoOutlinedIcon className={styles.icon} />
                                  </Popover>
                                </div>
                                <div className={styles.infoDetail}>
                                  <p>Team</p>
                                  <h6>{e.department}</h6>
                                  {e.salary?.salary !== '-' && (
                                    <h6 className={styles.package}>
                                      <strong>
                                        {e.salary?.currency}
                                        {e.salary?.salary}
                                      </strong>{' '}
                                      {e.salary?.tenure}
                                    </h6>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              {jobDetails && (
                <div className={styles.ManiG}>
                  <div className={styles.comanyRight}>
                    <div className={styles.detailInfo}>
                      <div className={styles.cphoto}>
                        <img alt='company Logo' src={G_Logo} width={90} />
                      </div>
                      <h6>
                        {jobDetails?.position},
                        <br />
                        {jobDetails?.companyName}
                      </h6>
                      <p>
                        {jobDetails?.companyName}, {jobDetails?.location}
                      </p>
                    </div>
                    <hr />
                    <div className={styles.minimumMain}>
                      <div className={styles.minimumD}>
                        <h6>Description</h6>
                        <p>
                          <h6>-</h6>
                          {jobDetails?.jobDetails?.description}{' '}
                        </p>
                        <hr />
                      </div>
                      <div className={styles.minimumD}>
                        <h6>About the Job:</h6>
                        <p> {jobDetails?.jobDetails?.aboutJob}</p>
                      </div>
                      {/* <Accordion className={styles.acc}>
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>Read More</Accordion.Header>
                        <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion> */}
                    </div>
                  </div>
                  <div className={styles.apply}>
                    <button className={styles.applyBtn}>Apply Now</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
