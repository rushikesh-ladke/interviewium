import React from 'react';
import { Input, Modal } from 'antd';

export const AddComments = (props: any) => {
  const ModalAntd: any = Modal;

  return (
    <div>
      <ModalAntd
        title='HR Comments To Interviewer'
        visible={props?.isModalVisible}
        onOk={() => {
          props?.onOk();
          props?.setIsModalVisible(false);
          props?.setHRComment('');
        }}
        onCancel={() => {
          props?.setIsModalVisible(false);
        }}
      >
        <Input.TextArea onChange={e => props?.setHRComment(e.target.value)} />
      </ModalAntd>
    </div>
  );
};
