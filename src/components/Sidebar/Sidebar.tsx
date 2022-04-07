import styles from './styles.module.scss';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Accordion from 'react-bootstrap/Accordion'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import G_Logo from '../../images/g_logo.svg';
export const Sidebar = () => {
  return (
    <div className={`${styles.appMain}`}>
      <div className={styles.header}>
        <aside className={styles.aside}>
          <ul>
            <h6>General</h6>
            <div className='d-flex'>
              <li className={`col-6`}>
                <DashboardOutlinedIcon className={styles.icons} />
                Dashboard
              </li>
              <li className={`col-6  ${styles.active}`}>
                <WorkOutlineOutlinedIcon className={styles.icons} />
                Jobs
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <AssignmentIndOutlinedIcon className={styles.icons} />
                Assign
              </li>
              <li className={`col-6 `}>
                <PersonPinOutlinedIcon className={styles.icons} />
                Interviewer
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <ListAltOutlinedIcon className={styles.icons} />
                Ongoing
                <br /> Interviews
              </li>
              <li className={`col-6 `}>
                <AppRegistrationOutlinedIcon className={styles.icons} />
                Previous
                <br /> Interviews
              </li>
            </div>
          </ul>
          <ul>
            <h6>Account</h6>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <CommentOutlinedIcon className={styles.icons} />
                Feedback
              </li>
              <li className={`col-6 `}>
                <SettingsApplicationsIcon className={styles.icons} />
                Settings
              </li>
            </div>
            <div className='d-flex'>
              <li className={`col-6 `}>
                <PowerSettingsNewOutlinedIcon className={styles.icons} />
                Log out
              </li>
            </div>
          </ul>
          <ul>
            <div className={styles.boxMain}></div>
          </ul>
        </aside>
      </div>
      <div className={styles.appBody}>
        <div className={styles.dataBody}>
          <div className='row'>
            <div className="col-lg-8">
              <div className={styles.middleB}>
                {/* search */}
                <div className={styles.searchD}>
                  <div className={`input-group mb-3 ${styles.searchBox}`}>
                    <input type="text" className={`form-control ${styles.Sinput}`} placeholder="Search by Category, Company or..." aria-label="Search by Category, Company or..." aria-describedby="button-addon2" />
                    <button className={`btn ${styles.searchBtn}`} type="button" id="button-addon2"><SearchIcon /></button>
                    <FilterAltOutlinedIcon className={`${styles.filtericon}`} />
                  </div>
                </div>
                {/* filter */}
                <div className={styles.filter}>
                  <div className={styles.fresult}>
                    <div className={styles.fcards}>
                      UI Designers
                    </div>
                    <div className={`${styles.fcards} ${styles.active}`}>
                      Product Designers
                    </div>
                    <div className={styles.fcards}>
                      Web Developers
                    </div>
                  </div>
                  <div className={styles.cresult}>
                    <p>Clear filters</p>
                  </div>
                </div>
                {/* sort */}
                <div className={styles.sort}>
                  <div className={styles.jobF}>
                    <h6>Job For You:<span> Popular</span></h6>
                  </div>
                  <div className={styles.sortTab}>
                    sort:  <select className={`form-select ${styles.Dselect}`}>
                      <option selected>Choose...</option>
                      <option value="1">Newest</option>
                      <option value="2">Popular</option>
                      <option value="3">Old</option>
                    </select>
                  </div>
                </div>
                {/* Main cards */}
                <div className={styles.companyList}>
                  <div className={styles.companyCard}>
                    <div className='row'>
                      <div className='col-lg-1'>
                        <div className={styles.cphoto}>
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
                          <img src={G_Logo} />
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
                              <RemoveRedEyeOutlinedIcon className={styles.icon} />
                              &nbsp;Views
                            </div>
                          </div>
                          <h6 className={styles.dot}>Today &bull; Full-time &bull; 5 applied</h6>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className={styles.info}>
                          <div className={styles.infoI}>
                            <BookmarkBorderOutlinedIcon className={styles.icon} />
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
            <div className="col-lg-4">
              <div className={styles.ManiG}>
                <div className={styles.comanyRight}>
                  <div className={styles.detailInfo}>
                    <div className={styles.cphoto}>
                      <img src={G_Logo} />
                    </div>
                    <h6>UX Designer,<br />Google Pay</h6>
                    <p>Google Inc., Shanghai China</p>
                  </div>
                  <hr />
                  <div className={styles.minimumMain}>
                    <div className={styles.minimumD}>
                      <h6>Minimum Qualifications</h6>
                      <p><h6>-</h6>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                      <p><h6>-</h6>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                      <p><h6>-</h6>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                      <hr />
                    </div>
                    <div className={styles.minimumD}>
                      <h6>About the Job:</h6>
                      <p>                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.</p>
                    </div>
                    <Accordion className={styles.acc}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Read More</Accordion.Header>
                        <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
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
    </div >
  );
};
