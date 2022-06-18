import React from 'react';
import { Modal } from 'antd';

import styles from '../styles.module.scss';

export const Feedback = (props: any) => {
  const ModalAntd: any = Modal;

  return (
    <div>
      <ModalAntd
        text
        visible={props.isModalVisible}
        onOk={() => props.feedbackHandler()}
        onCancel={() => props.handleCancel()}
        className={styles.FeedbackModal}
      >
        <h5>
          <strong>Give feedback</strong>
        </h5>
        <p>What do you think of the editing tool?</p>
        <div className={styles.feedShare}>
          <label className='form-label'>
            Do you have any thoughts you'd like to share?
          </label>
          <textarea className='form-control'></textarea>
        </div>

        <label className='form-check-label mb-3'>
          May we follow you up on your feedback?
        </label>
        <div className='mb-3 d-flex'>
          <div>
            <input type='radio' className='form-check-input' />
            <label className='form-check-label'>Yes</label>
          </div>
          <div className='ms-5'>
            <input type='radio' className='form-check-input' />
            <label className='form-check-label'>No</label>
          </div>
        </div>
        <div className='d-flex mt-5'>
          <button className={styles.sendBtn}>Send</button>
          <button className={styles.cancelBtn}>Cancel</button>
        </div>
      </ModalAntd>
    </div>
  );
};
