import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import G_Logo from '../../images/company.png';
import { Badge, Tag, Segmented } from 'antd';
import { CreateJob } from './modal/createJob';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../shared/firebase-config';
export const Jobs = () => {
  const userID: any = localStorage.getItem('uid');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [jobDetails, setjobDetails] = useState<any>(null);
  const [sortValue, setSortValue] = useState<string | number>('Asc');

  useEffect(() => {
    getJobsData('asc');
  }, []);

  const getJobsData = async (order: any) => {
    console.log(order);
    const q = query(
      collection(db, 'jobs'),
      where('active', '==', true),
      where('details.HRid', '==', userID),
      orderBy('details.updatedAt', order)
    );

    const jobs: any = [];
    getDocs(q).then(snapshot => {
      snapshot.forEach((doc: any) => {
        jobs.push({ ...doc.data(), id: doc.id });
      });
      console.log(jobs);
      setJobsData(jobs);
      if (jobs.length > 0) {
        setjobDetails(jobs[0]);
      }
    });
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.appBody}>
        <CreateJob
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
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
                      placeholder='Search by Category, Company or...'
                      aria-label='Search by Category, Company or...'
                      aria-describedby='button-addon2'
                    />
                    <button
                      className={`btn ${styles.searchBtn}`}
                      type='button'
                      id='button-addon2'
                    >
                      <SearchIcon />
                    </button>
                    <FilterAltOutlinedIcon className={`${styles.filtericon}`} />
                  </div>
                </div>
                {/* filter */}
                <div className={styles.filter}>
                  <div className={styles.fresult}>
                    <div className={styles.fcards}> Job Type : Full-Time</div>
                    <div className={`${styles.fcards} ${styles.active}`}>
                      Workspace Type : Office
                    </div>
                    <div className={styles.fcards}>Remote</div>
                  </div>
                  <div className={styles.cresult}>
                    <p>Clear filters</p>
                  </div>
                </div>
                {/* sort */}
                <div className={styles.sort}>
                  <div className={styles.jobF}></div>
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
                        getJobsData(value);
                      }}
                    />
                    {/* <select
                      className={`form-select ${styles.Dselect}`}
                      onClick={(value: any) => getJobsData(value.target.value)}
                    >
                      <option selected>Choose...</option>
                      <option value='desc'>Newest</option>
                      <option value='asc'>Old</option>
                    </select> */}
                    <div className={styles.twoBtn}>
                      <button
                        className={styles.NewBtn}
                        onClick={() => showModal()}
                      >
                        <AddOutlinedIcon className={styles.AddIcon} />
                        New
                      </button>
                    </div>
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
                                <h4>{e.companyName}</h4>
                                <h6>
                                  {e.position}, {e.companyName}
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
                                  <BookmarkBorderOutlinedIcon
                                    className={styles.icon}
                                  />
                                  <InfoOutlinedIcon className={styles.icon} />
                                </div>
                                <div className={styles.infoDetail}>
                                  <p>Team</p>
                                  <h6>{e.department}</h6>
                                  <h6 className={styles.package}>
                                    <strong>
                                      {e.salary?.currency}
                                      {e.salary?.salary}
                                    </strong>{' '}
                                    / {e.salary?.tenure}
                                  </h6>
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
