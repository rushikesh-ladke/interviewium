import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Tabs,
  Empty,
  Select,
} from 'antd';
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
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [fieldValues, setFieldValues] = useState([
    {
      interview_type: 'interview_type_1',
      rounds: [],
    },
    {
      interview_type: 'interview_type_2',
      rounds: [],
    },
  ]);
  useEffect(() => {
    settingsVisibleHandler();
    getInterviewRounds();
  }, []);

  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log('Received values of form:', values);
  // };

  const getRounds = (field: any) => {
    let some: any = [];
    fieldValues.map((e: any) => {
      if (e.interview_type === field) {
        some = e.rounds;
      }
    });
    // console.log(some);
    return some;
  };

  const handleChange = (value: any) => {
    // console.log(value);
    form.setFieldsValue({
      rounds: getRounds(value) ? getRounds(value) : [],
    });
  };

  const settingsVisibleHandler = () => {
    if (profile?.companyDetails?.headHR) {
      setSettingsVisible(true);
    }
  };

  const getInterviewRounds = async () => {
    const companyId = profile.companyDetails.companyId;
    const data: any = await getSingleDocument(
      companyId,
      DOCUMENTS.COMPANY_ROUNDS
    );
    if (data.data) {
      setFieldValues(JSON.parse(data.data.roundsData));
    }
    setRoundsDetails(data);
  };

  const onFinish = (values: any) => {
    let fieldValuesData = fieldValues.map((e: any) => {
      if (e.interview_type === values.interview_type) {
        return {
          ...e,
          rounds: values.rounds,
        };
      } else {
        return e;
      }
    });

    setFieldValues(fieldValues);

    const companyId = profile.companyDetails.companyId;
    let roundsData = JSON.stringify(fieldValuesData);
    postInterviewDetails({ roundsData: roundsData }, companyId);
    getInterviewRounds();
    console.log('Received values of form:', fieldValuesData);
  };
  const types: any = [
    { label: 'Interview Type 1 - For Freshers', value: 'interview_type_1' },
    { label: 'Interview Type 2 - For Experienced', value: 'interview_type_2' },
  ];

  return (
    <div>
      <ModalAntd
        title=''
        visible={props?.isModalVisible}
        onOk={() => props?.handleOk()}
        onCancel={() => {
          props?.handleCancel();
        }}
        width={800}
        footer={null}
      >
        {settingsVisible ? (
          <Tabs defaultActiveKey='1' centered>
            <TabPane tab='Interview Rounds' key='1'>
              {roundsDetails.loaded ? (
                <Form
                  form={form}
                  name='dynamic_form_nest_item'
                  onFinish={onFinish}
                  autoComplete='off'
                  initialValues={fieldValues}
                >
                  <Form.Item
                    name='interview_type'
                    label='Interview Type'
                    rules={[{ required: true, message: 'Missing Type' }]}
                  >
                    <Select options={types} onChange={handleChange} />
                  </Form.Item>
                  <Form.List name='rounds'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} align='baseline'>
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area ||
                                prevValues.rounds !== curValues.rounds
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label='roundInfo'
                                  name={[field.name, 'roundInfo']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing Round Info',
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                              )}
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label='roundType'
                              name={[field.name, 'roundType']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Round Type',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>

                            <RemoveCircleIcon
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button
                            type='dashed'
                            onClick={() => add()}
                            block
                            icon={<AddIcon />}
                          >
                            Add rounds
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
        ) : (
          <Empty description={'Coming Soon'} />
        )}
      </ModalAntd>
    </div>
  );
};
