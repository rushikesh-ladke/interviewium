import React from 'react';
import { Modal } from 'antd';

export const Logout = (props: any) => {
  const ModalAntd: any = Modal;

  return (
    <div>
      <ModalAntd
        title='Logout'
        visible={props?.isModalVisible}
        onOk={() => props?.handleOk()}
        onCancel={() => {
          props?.handleCancel();
        }}
      >
        <p>Bye Bye! Be back soon.</p>
        <p>Hope you liked it here, provide your feedback to grow together</p>
      </ModalAntd>
    </div>
  );
};
