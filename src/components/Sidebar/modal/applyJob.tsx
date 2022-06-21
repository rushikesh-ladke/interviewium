import React from 'react';
import { Button, Modal } from 'antd';
import { PATH } from '../../../constants/path';

export const ApplyJobModal = (props: any) => {
  const ModalAntd: any = Modal;

  return (
    <div>
      <ModalAntd
        title='Apply Jobs'
        visible={props?.isModalVisible}
        onOk={() => props?.handleOk()}
        onCancel={() => {
          props?.handleCancel();
        }}
        footer={null}
      >
        {props.jobId.map((e: any) => {
          return (
            <div className='p-1' key={e}>
              <Button type='dashed' block>
                <a
                  href={`${window.location.origin}${PATH.JOB_DETAILS}?id=${e}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Go to the Job Application Page
                </a>
              </Button>
            </div>
          );
        })}
      </ModalAntd>
    </div>
  );
};
