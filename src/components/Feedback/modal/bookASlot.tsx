import React, { useEffect, useState } from 'react';
import { Button, Empty, Modal, notification, Popconfirm, Tag } from 'antd';
import { getSingleDocument } from '../../../functions/getUserProfile';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { PATH } from '../../../constants/path';
import { updateDocument } from '../../../functions/updateDoc';
import { STATUS } from '../../../constants/status';
import { serverTimestamp } from 'firebase/firestore';

export const BookASlot = (props: any) => {
  const ModalAntd: any = Modal;

  const [slot, setSlot] = useState<any[]>();
  const [slotsData, setSlotsData] = useState(false);
  const [finalBooking, setFinalBooking] = useState('');

  useEffect(() => {
    getSlotsData();
  }, []);

  const getSlotsData = async () => {
    const slots = await getSingleDocument(
      props.roundDetails?.auditorDetails?.auditorId,
      DOCUMENTS.AUDITOR_SLOTS
    );
    if (slots.loaded && slots.error === null) {
      const data = JSON.parse(slots.data.slots);
      const availableSLots = data?.slots.filter((e: any) => {
        if (e.availability === 'available') {
          return true;
        }
        return false;
      });
      if (availableSLots.length === 0) {
        setSlotsData(false);
      }
      setSlot(data?.slots);
    } else {
      notification['error']({
        message: 'Error',
        description: `No slots Available, Please contact HR`,
      });
    }
    setSlotsData(true);
  };

  const slotBookingHandler = () => {
    updateDocument(DOCUMENTS.ROUNDS, props.roundDetails?.id, {
      interviewTimeAndDate: finalBooking,
      status: STATUS.BOOKED,
      updatedAt: serverTimestamp(),
    });

    let slotsValue: any = slot?.map((e: any) => {
      if (e.slot === finalBooking) {
        return {
          ...e,
          availability: 'booked',
        };
      } else {
        return e;
      }
    });
    slotsValue = { slots: slotsValue };
    slotsValue = JSON.stringify(slotsValue);
    updateDocument(
      DOCUMENTS.AUDITOR_SLOTS,
      props.roundDetails?.auditorDetails?.auditorId,
      { slots: slotsValue }
    );
    updateDocument(DOCUMENTS.INTERVIEWS, props.roundDetails?.interviewId, {
      status: STATUS.BOOKED,
      updatedAt: serverTimestamp(),
    });
    notification['success']({
      message: 'Success',
      description: `Slot Booked`,
    });
    props?.setIsModalVisible(false);
  };

  return (
    <div>
      <ModalAntd
        title='Book Interview Slot'
        visible={props?.isModalVisible}
        onCancel={() => {
          props?.setIsModalVisible(false);
        }}
        footer={null}
      >
        {slotsData ? (
          <>
            <h4>Interview Available Slots</h4>
            <h6>Please select suitable slot for Interview</h6>
            {slot &&
              slot.length > 0 &&
              slot.map((e: any) => {
                if (e.availability !== 'booked') {
                  return (
                    <Tag
                      color='magenta'
                      onClick={() => {
                        setFinalBooking(e.slot);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {e.slot}
                    </Tag>
                  );
                }
              })}
            {finalBooking !== '' && (
              <div className='p-4'>
                <Popconfirm
                  title='Confirm Booking?'
                  onConfirm={slotBookingHandler}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button block>
                    <h5>Book {finalBooking}</h5>
                  </Button>
                </Popconfirm>
              </div>
            )}
          </>
        ) : (
          <Empty description='No Slots Available. Please contact the HR' />
        )}
      </ModalAntd>
    </div>
  );
};
