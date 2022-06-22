import React, { useEffect, useState } from 'react';
import {
  Modal,
  Segmented,
  Empty,
  Button,
  Typography,
  Input,
  Divider,
} from 'antd';
import { getSingleDocument } from '../../../functions/getUserProfile';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { updateStatus } from '../ongoing-interview-api';
import { STATUS } from '../../../constants/status';

export const SelectInterviewType = (props: any) => {
  const ModalAntd: any = Modal;
  const { Text } = Typography;

  let userId: any = localStorage.getItem('uid');
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);

  const [interviewTypes, setInterviewTypes] = useState([]);
  const [selectedType, setSelectedType] = useState<any>({});
  const [HRComments, setHRComments] = useState('');
  useEffect(() => {
    getInterviewTypes();
  }, []);

  const getInterviewTypes = async () => {
    const companyID = profile.companyDetails.companyId;
    let interviewTypes: any = await getSingleDocument(
      companyID,
      DOCUMENTS.COMPANY_ROUNDS
    );
    if (interviewTypes.data) {
      interviewTypes = JSON.parse(interviewTypes.data.roundsData);
      console.log(interviewTypes);
      setInterviewTypes(interviewTypes);
      setSelectedType(interviewTypes[0]);
    }
  };

  const getSegmentedData = () => {
    const types = interviewTypes.map((e: any) => {
      return e?.interview_type;
    });
    return types;
  };

  const onChangeType = (value: any) => {
    const selectedAttribute = interviewTypes.filter((e: any) => {
      if (e.interview_type === value) {
        return true;
      }
      return false;
    });
    if (selectedAttribute.length === 1) {
      setSelectedType(selectedAttribute[0]);
      console.log(selectedAttribute[0]);
    }
  };

  const confirmAccept: any = (id: any) => {
    const convertSelectedType = JSON.stringify(selectedType);
    const acceptedInterviewData = {
      status: STATUS.ASSIGN,
      interviewProcessData: convertSelectedType,
      HRComments: HRComments,
      totalInterviewRounds: selectedType.rounds.length,
      acceptedHRId: userId,
    };
    updateStatus(acceptedInterviewData, id);
    props.getCandidateRequests();
  };

  return (
    <div>
      <ModalAntd
        title=''
        visible={props?.isModalVisible}
        onOk={() => props?.setIsModalVisible(false)}
        onCancel={() => {
          props?.setIsModalVisible(false);
        }}
        footer={null}
      >
        {interviewTypes && interviewTypes.length > 0 ? (
          <>
            <h4>Select the Interview Type</h4>
            <Divider />
            Candidate Name :
            <Text type='success'>
              {' '}
              {props?.candidateViewed?.intervieweeDetails?.intervieweeName}
            </Text>
            <br />
            Position :
            <Text code>{props?.candidateViewed?.jobDetails?.jobPost}</Text>
            <Segmented
              block
              options={getSegmentedData()}
              onChange={(value: any) => onChangeType(value)}
              className='m-3'
            />
            <h6 className='p-2'>
              Number of Interview Rounds : {selectedType.rounds.length}
            </h6>
            <Input.TextArea
              placeholder='HR comments'
              onChange={e => {
                setHRComments(e.target.value);
              }}
            />
            <div className='p-4'>
              <Button
                block
                type='primary'
                onClick={() => {
                  confirmAccept(props?.candidateViewed?.id);
                  props?.setIsModalVisible(false);
                }}
              >
                Accept the Candidate
              </Button>
            </div>
          </>
        ) : (
          <Empty description={'Ask Company HR to add Interview Types'} />
        )}
      </ModalAntd>
    </div>
  );
};
