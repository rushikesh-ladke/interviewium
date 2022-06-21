import React from 'react';
import styles from '../styles.module.scss';
import { useDrag } from 'react-dnd';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import Avatar from '../../../images/avatar.svg';

const IntervieweeCard = (props: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'interviewee',
    item: { itemID: props },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // info: fires after drop from auditorCard
      if (item && dropResult) {
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      item: monitor.getItem(),
    }),
  }));

  const getDate = (serverDate: any) => {
    let some = serverDate.toDate();
    some =
      some.getDate() + ' ' + some.toLocaleString('default', { month: 'long' });
    return some;
  };

  return (
    <div className={styles.studentCard} ref={drag} id={props?.index}>
      {/* style={{color : isDragging ? '#FF3F3F' : 'blue'}} */}
      <h6>
        {props?.e.intervieweeDetails &&
        props?.e.intervieweeDetails.intervieweeName
          ? props?.e.intervieweeDetails.intervieweeName
          : ''}
      </h6>
      <div className='d-flex'>
        <div className={styles.profile}>
          <div className={styles.dot}></div>
          {props?.e.jobDetails ? props?.e.jobDetails.jobPost : ''}
        </div>
      </div>
      <div className={styles.activeStatus}>
        <TimelapseOutlinedIcon className={styles.time} />{' '}
        {getDate(props?.e.updatedAt)}
      </div>
      <div className='d-flex justify-content-center'>
        <img src={Avatar} alt='Profile' className={styles.profilePic} />
      </div>
    </div>
  );
};

export default IntervieweeCard;
