import React from 'react';
import { useDrop } from 'react-dnd';
import styles from '../styles.module.scss';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Avatar from '../../../images/avatar.svg';

const AuditorCard = (props: any) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'interviewee',
    drop: (monitor: any) => {
      props.commentsModal(monitor.itemID.e, props.e);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = 'inherit';
  let border = ' ';
  let transition = ' ';
  if (isActive) {
    backgroundColor = '#f7cc1b';
    border = '2px solid aqua';
    transition = 'border-width 0.1s linear';
  } else if (canDrop) {
  }
  return (
    <div
      className={styles.assignCards}
      ref={drop}
      style={{ backgroundColor, border, transition }}
      key={props?.index}
    >
      <div className={styles.studentCard}>
        <h6>
          {props?.e.profile.firstName} {props?.e.profile.lastName}
        </h6>
        <div className='d-flex'>
          <div className={styles.profile}>
            <div className={styles.dot}></div>
            {props?.e.currentPosition}
          </div>
        </div>
        <div className={styles.activeStatus}>
          <AccessibilityNewIcon className={styles.time} /> Role :{' '}
          {props?.e.role}
        </div>
        <div className='d-flex justify-content-center'>
          <img src={Avatar} alt='Profile' className={styles.profilePic} />
        </div>
      </div>
    </div>
  );
};

export default AuditorCard;
