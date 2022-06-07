import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Accordion from 'react-bootstrap/Accordion';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import G_Logo from '../../images/g_logo.svg';
import { Badge } from 'antd';
import { CreateJob } from './modal/createJob';
import { getJobs } from './jobs-api';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from 'shared/firebase-config';
export const Jobs = () => {
  const userID: any = localStorage.getItem('uid');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    getJobsData();
  }, []);

  const getJobsData = async () => {
    const q = query(
      collection(db, 'jobs'),
      where('active', '==', true),
      where('details.HRid', '==', userID)
    );

    const jobs: any = [];
    getDocs(q).then(snapshot => {
      snapshot.forEach(doc => {
        jobs.push(doc.data());
      });
      console.log(jobs);
      setJobsData(jobs);
    });
    console.log(jobs);
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
                    <div className={styles.fcards}>UI Designers</div>
                    <div className={`${styles.fcards} ${styles.active}`}>
                      Product Designers
                    </div>
                    <div className={styles.fcards}>Web Developers</div>
                  </div>
                  <div className={styles.cresult}>
                    <p>Clear filters</p>
                  </div>
                </div>
                {/* sort */}
                <div className={styles.sort}>
                  <div className={styles.jobF}>
                    <h6>
                      Job For You:<span> Popular</span>
                    </h6>
                  </div>
                  <div className={styles.sortTab}>
                    sort:{' '}
                    <select className={`form-select ${styles.Dselect}`}>
                      <option selected>Choose...</option>
                      <option value='1'>Newest</option>
                      <option value='2'>Popular</option>
                      <option value='3'>Old</option>
                    </select>
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
                        <div className={styles.companyCard}>
                          <div className='row'>
                            <div className='col-lg-1'>
                              <div className={styles.cphoto}>
                                <img alt='company Logo' src={G_Logo} />
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
                                <h6 className={styles.dot}>
                                  Today &bull; {e.jobType} &bull;{' '}
                                  {e.totalApplied} applied
                                </h6>
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
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull; 5 applied
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull; 5 applied
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull;{' '}
                            <Badge count='5 applied' />
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull; 5 applied
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.companyCard} ${styles.active}`}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull; 5 applied
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img alt='company Logo' src={G_Logo} />
                        </div>
                      </div>
                      <div className='col-lg-8 ps-4'>
                        <div className={styles.companyI}>
                          <h4>Google Inc.</h4>
                          <h6>UX Designer, Google Pay</h6>
                          <div className='d-flex'>
                            <div className={styles.Locate}>
                              <LocationOnIcon className={styles.icon} />
                              &nbsp;New York, US
                            </div>
                            <div className={`${styles.Locate} ms-3`}>
                              <RemoveRedEyeOutlinedIcon
                                className={styles.icon}
                              />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>
                            Today &bull; Full-time &bull; 5 applied
                          </h6>
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
                            <h6>Product and Design</h6>
                            <h6 className={styles.package}>
                              <strong>$120k</strong> / year
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className={styles.ManiG}>
                <div className={styles.comanyRight}>
                  <div className={styles.detailInfo}>
                    <div className={styles.cphoto}>
                      <img alt='company Logo' src={G_Logo} />
                    </div>
                    <h6>
                      UX Designer,
                      <br />
                      Google Pay
                    </h6>
                    <p>Google Inc., Shanghai China</p>
                  </div>
                  <hr />
                  <div className={styles.minimumMain}>
                    <div className={styles.minimumD}>
                      <h6>Minimum Qualifications</h6>
                      <p>
                        <h6>-</h6>Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book.{' '}
                      </p>
                      <p>
                        <h6>-</h6>Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book.{' '}
                      </p>
                      <p>
                        <h6>-</h6>Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book.{' '}
                      </p>

                      <hr />
                    </div>
                    <div className={styles.minimumD}>
                      <h6>About the Job:</h6>
                      <p>
                        {' '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                    <Accordion className={styles.acc}>
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
                    </Accordion>
                  </div>
                </div>
                <div className={styles.apply}>
                  <button className={styles.applyBtn}>Apply Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
