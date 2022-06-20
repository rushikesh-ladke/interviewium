import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Spin, Tabs } from 'antd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import { postInterviewDetails } from '../sidebar-api';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { getSingleDocument } from '../../../functions/getUserProfile';

export const CompanySettings = (props: any) => {
  const ModalAntd: any = Modal;
  const { TabPane } = Tabs;
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);

  const [roundsDetails, setRoundsDetails] = useState<any>({});

  useEffect(() => {
    getInterviewRounds();
  }, []);

  const getInterviewRounds = async () => {
    const companyId = profile.companyDetails.companyId;
    const data: any = await getSingleDocument(
      'rounds',
      `${DOCUMENTS.COMPANY_DOCUMENTS}/${companyId}/rounds`
    );
    setRoundsDetails(data);
  };

  const onFinish = (values: any) => {
    const companyId = profile.companyDetails.companyId;

    let valueMan = values.users.map((e: any, index: any) => {
      return { ...e, round: `round_${index}` };
    });
    postInterviewDetails({
      value: valueMan,
      companyId: companyId,
    });
    console.log('Received values of form:', valueMan);
  };

  return (
    <div>
      <ModalAntd
        title='Company Settings'
        visible={props?.isModalVisible}
        onOk={() => props?.handleOk()}
        onCancel={() => {
          props?.handleCancel();
        }}
        width={1000}
        footer={null}
      >
        <Tabs defaultActiveKey='1' centered>
          <TabPane tab='Interview Rounds' key='1'>
            {roundsDetails.loaded ? (
              <Form
                name='dynamic_form_nest_item'
                onFinish={onFinish}
                autoComplete='off'
              >
                <Form.List
                  name='users'
                  initialValue={
                    roundsDetails.data ? roundsDetails.data.value : []
                  }
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align='baseline'
                        >
                          <label>Round {index + 1}</label>
                          <Form.Item
                            {...restField}
                            name={[name, 'roundInfo']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Round Information',
                              },
                            ]}
                          >
                            <Input placeholder='Round Information' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'roundType']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Round to be taken on',
                              },
                            ]}
                          >
                            <Input placeholder='Interview to be taken on' />
                          </Form.Item>
                          <RemoveCircleIcon onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type='dashed'
                          onClick={() => add()}
                          block
                          icon={<AddIcon />}
                        >
                          Add Interview Round
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Spin />
            )}
          </TabPane>
          {/* <TabPane tab='Tab 2' key='2'>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab='Tab 3' key='3'>
            Content of Tab Pane 3
          </TabPane> */}
        </Tabs>
      </ModalAntd>
    </div>
  );
};
