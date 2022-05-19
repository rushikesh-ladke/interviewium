import { useState } from 'react';
import { Modal } from 'antd';
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
import Avatar from '../../images/avatar.svg';
import TvIcon from '@mui/icons-material/Tv';
export const IntervieweeDetails = () => {

  return (<>
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
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <div className={styles.DetailsMain}>
              <img src={Avatar} alt="User Avatar" className={styles.userAvatar} />
              <h1 className={styles.UserName}>Rushikesh Ladke</h1>
              <div className={styles.userPoint}>
                Restructured a plotting algorithm for a printing platform allowing paid 50K+ users to plot<br />
                structures to 0.01 mm precision.
              </div>
              <div className="row mb-4">
                <div className="col-lg-6">
                  <video className={styles.videoN} controls />
                  <source src="https://www.youtube.com/watch?v=hQAHSlTtcmY" />
                  <source src="https://www.youtube.com/watch?v=hQAHSlTtcmY" />
                </div>
                <div className="col-lg-6">
                  <div className={styles.roleInfo}>
                    <h5>Full-Stack Developer</h5>
                    <h6>Invimatic Solutions, India</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. </p>
                  </div>
                </div>
              </div>
              <div className={styles.TopSkills}>
                <h2><TvIcon className={styles.icon} />Top Skills</h2>
                <div className={styles.info}>
                  <h4>JavaScript</h4>
                  <h6>2 Years of experience</h6>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
                </div>
                <div className={styles.info}>
                  <h4>React Js</h4>
                  <h6>2 Years of experience</h6>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
                </div>
              </div>
              <div className={styles.StackExp}>
                <h2>Stack Experience</h2>
                <h6><strong>Languages: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Frontend Libraries & Frameworks: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Backend Libraries & Frameworks: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Databases: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Testing: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Cloud: </strong>Lorem Ipsum is simply dumm</h6>
                <h6><strong>Mobile App Development: </strong>Lorem Ipsum is simply dumm</h6>
              </div>
              <div className={styles.edu}>
                <h2>Education</h2>
                <p>Engineering Fellow, Pesto Tech, 2021</p>
                <p>Bachelor of computer Engineering, VIT, 2020</p>
              </div>
              <div className={styles.profExp}>
                <div className='d-flex justify-content-between'>
                  <h2>Professional Experience</h2>
                  <h5>Aug '20 - Present</h5>
                </div>
                <div className={styles.info}>
                  <h5>Invimatic Solutions, Pune(India) - Software Engineer</h5>
                  <h6>January 2020 - Present 1 Year 1 Month</h6>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
                  <div className={styles.infoStack}>
                    <p>Tech Stack: React, Nextjs, Gatsby, Nextjs, HTML, and SaSS</p>
                    <ul>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.info}>
                  <h5>Freelancer, Pune(India) - Software Engineer</h5>
                  <h6>January 2020 - Present 1 Year 1 Month</h6>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
                  <div className={styles.infoStack}>
                    <p>Tech Stack: React, Nextjs, Gatsby, Nextjs, HTML, and SaSS</p>
                    <ul>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  </>);
};
