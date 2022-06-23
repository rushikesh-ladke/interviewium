import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Tabs,
  Empty,
  Select,
  DatePicker,
} from 'antd';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import { postInterviewDetails } from '../sidebar-api';
import { DOCUMENTS } from '../../../constants/firebase-docs';
import { getSingleDocument } from '../../../functions/getUserProfile';
import moment from 'moment';
import { createDocument } from '../../../functions/setDoc';

export const Settings = (props: any) => {
  const ModalAntd: any = Modal;
  const { TabPane } = Tabs;
  const userId: any = localStorage.getItem('uid');
  let profile: any = localStorage.getItem('_profile');
  profile = JSON.parse(profile);
  const { Option } = Select;

  const [roundsDetails, setRoundsDetails] = useState<any>({});
  const [roundsDataSettingsVisible, setroundsDataSettingsVisible] =
    useState(false);
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

  const [slotsData, setSlotsData] = useState<any>();
  const [slotsDataLoaded, setSlotsDataLoaded] = useState<any>(false);

  useEffect(() => {
    settingsVisibleHandler();
    getInterviewRounds();
    getBookingSlots();
  }, []);

  const [form] = Form.useForm();

  const getRounds = (field: any) => {
    let some: any = [];
    fieldValues.map((e: any) => {
      if (e.interview_type === field) {
        some = e.rounds;
      }
    });
    return some;
  };

  const handleChange = (value: any) => {
    form.setFieldsValue({
      rounds: getRounds(value) ? getRounds(value) : [],
    });
  };

  const settingsVisibleHandler = () => {
    if (profile?.companyDetails?.headHR) {
      setroundsDataSettingsVisible(true);
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

  const getBookingSlots = async () => {
    const data: any = await getSingleDocument(userId, DOCUMENTS.AUDITOR_SLOTS);
    if (data.data) {
      let slotsData = JSON.parse(data.data.slots);
      slotsData = slotsData.slots.map((e: any) => {
        return {
          ...e,
          slot: moment(e.slot, 'DD-MM-YY hh:mm a'),
        };
      });

      setSlotsData({ slots: slotsData });
    }
    setSlotsDataLoaded(true);
  };

  const onFinish = (values: any) => {
    let fieldValuesData = fieldValues.map((e: any, index: any) => {
      if (e.interview_type === values.interview_type) {
        return {
          ...e,
          rounds: values.rounds.map((e1: any, index: any) => {
            return {
              ...e1,
              round: index + 1,
            };
          }),
        };
      } else {
        return e;
      }
    });

    setFieldValues(fieldValuesData);

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

  const scheduleHandler = (fieldsValue: any) => {
    let slots = fieldsValue.slots.map((e: any) => {
      return {
        ...e,
        slot: e.slot.format('DD-MM-YY hh:mm a'),
      };
    });
    slots = JSON.stringify({ slots: slots });
    createDocument(DOCUMENTS.AUDITOR_SLOTS, userId, { slots: slots });
    console.log('Received values of form: ', slots);
  };

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
        {true ? (
          <Tabs defaultActiveKey='1' centered>
            {roundsDataSettingsVisible && roundsDetails.loaded && (
              <TabPane tab='Interview Rounds' key='1'>
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
                        {fields.map((field, index) => (
                          <Space key={field.key} align='baseline'>
                            <div>Round {index + 1}</div>
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
                                  label='Round Info'
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
                              label='Round Medium'
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
              </TabPane>
            )}
            <TabPane tab='Select Time Slots' key='2'>
              {slotsDataLoaded && (
                <Form
                  name='schedule_handler'
                  onFinish={scheduleHandler}
                  autoComplete='off'
                  initialValues={slotsData}
                >
                  <Form.List name='slots'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align='baseline'
                            >
                              <Form.Item
                                {...restField}
                                name={[name, 'slot']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing slot name',
                                  },
                                ]}
                              >
                                <DatePicker
                                  showTime
                                  use12Hours
                                  format='DD-MM-YY hh:mm a'
                                  minuteStep={15}
                                />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'duration']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Duration',
                                  },
                                ]}
                              >
                                <Select defaultValue='' style={{ width: 120 }}>
                                  <Option value='15_min'>15 Mins</Option>
                                  <Option value='30_min'>30 Mins</Option>
                                  <Option value='45_min'>45 Mins</Option>
                                  <Option value='60_min'>60 Mins</Option>
                                </Select>
                              </Form.Item>
                              <RemoveCircleIcon onClick={() => remove(name)} />
                            </Space>
                          );
                        })}
                        <Form.Item>
                          <Button
                            type='dashed'
                            onClick={() => add()}
                            block
                            icon={<AddIcon />}
                          >
                            Add field
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
              )}
            </TabPane>
            {/* <TabPane tab='Tab 3' key='3'>
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
