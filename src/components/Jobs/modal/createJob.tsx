import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  InputNumber,
  Checkbox,
  Slider,
  Select,
} from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import { serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { createUpdateJob, updateJob } from '../jobs-api';
import styles from '../styles.module.scss';

export const CreateJob = ({
  isModalVisible,
  handleOk,
  handleCancel,
  data,
}: any) => {
  const [form] = Form.useForm();
  const ModalAntd: any = Modal;

  const userID: any = localStorage.getItem('uid');

  const { auth } = useAuth();
  const { Option } = Select;

  const [HREmail, setHREmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [addSalaryData, setAddSalaryData] = useState(
    data && data.salary.salary !== '-' ? true : false
  );
  const [minExp, setMinExp] = useState(data ? data.minExp : 0);
  const [maxExp, setMaxExp] = useState(data ? data.maxExp : 1);
  const [currency, setCurrency] = useState('₹');
  useEffect(() => {
    getUserDetails();
  }, []);
  const onFinish = (values: any) => {
    console.log(values);
    if (data && data.id) {
      const createJob = {
        ...values,
        companyName: companyName,
        companyId: auth.profile.companyDetails.companyId,
        HREmail: HREmail,
        HRid: userID,
        currency: currency,
        minExp: minExp,
        maxExp: maxExp,
        updatedAt: serverTimestamp(),
      };
      updateJob(createJob, data.id);
    } else {
      const createJob = {
        ...values,
        companyName: companyName,
        companyId: auth.profile.companyDetails.companyId,
        HREmail: HREmail,
        HRid: userID,
        currency: currency,
        minExp: minExp,
        maxExp: maxExp,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      createUpdateJob(createJob);
    }
    form.resetFields();
    handleCancel();
  };
  const getUserDetails = () => {
    const userDetails: any = localStorage.getItem('user');
    let email: any = '';
    try {
      email = JSON.parse(userDetails);
    } catch {
      email = '';
    }
    setHREmail(email?.email);
    setCompanyName('Interviewium');
  };

  const marks: SliderMarks = {
    0: 'Fresher',
  };
  return (
    <>
      <ModalAntd
        title='Create a free job'
        visible={isModalVisible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        className={styles.modalAnt}
        key={'create_job'}
      >
        <h6>
          <strong>Find a great hire, fast!</strong>
        </h6>
        <div className={styles.formAll}>
          <Form
            name='post_job'
            className='das'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <label className='form-label'>Position Name*</label>
            <Form.Item
              name='position'
              rules={[
                { required: true, message: 'Please input your Position Name' },
                {
                  min: 3,
                  message: 'Name should be more then 3 characters',
                },
              ]}
              hasFeedback
              initialValue={data ? data.position : ''}
            >
              <Input
                className={styles.form_control}
                placeholder='Software Developer'
              />
            </Form.Item>
            <div className='d-flex '>
              <div className='p-3'>
                {' '}
                <label className='form-label'>Min Experience*</label>
                <Form.Item name='minExp'>
                  {' '}
                  <Slider
                    marks={marks}
                    defaultValue={minExp}
                    min={0}
                    max={25}
                    onChange={(value: any) => {
                      setMinExp(value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className='p-3'>
                <label className='form-label'>Max Experience*</label>
                <Form.Item name='maxExp'>
                  {' '}
                  <Slider
                    marks={marks}
                    defaultValue={maxExp}
                    min={0}
                    max={25}
                    onChange={(value: any) => {
                      setMaxExp(value);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <label className='form-label'>Number of Candidates Required</label>
            <Form.Item
              name='totalHiresRequired'
              initialValue={
                data && data.totalHiresRequired ? data.totalHiresRequired : ''
              }
            >
              <InputNumber style={{ width: 150 }} />
            </Form.Item>
            <Form.Item
              label='Job Type'
              name='jobType'
              initialValue={data ? data.jobType : ''}
            >
              <Radio.Group>
                <Radio.Button value='Full-time'>Full-time</Radio.Button>
                <Radio.Button value='Part-time'>Part-time</Radio.Button>
                <Radio.Button value='Contract'>Contract</Radio.Button>
                <Radio.Button value='Internship'>Internship</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label='Workspace Type'
              name='workspaceType'
              initialValue={data ? data.workspaceType : ''}
            >
              <Radio.Group>
                <Radio.Button value='Office'>Office</Radio.Button>
                <Radio.Button value='Hybrid'>Hybrid</Radio.Button>
                <Radio.Button value='Remote'>Remote</Radio.Button>
                <Radio.Button value='On-site'>On-site</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <label className='form-label'>Office Location*</label>
            <Form.Item
              name='location'
              rules={[
                {
                  required: true,
                  message: 'Please input your Office Location',
                },
                {
                  min: 3,
                  message: 'Location can be more then 3 characters',
                },
              ]}
              hasFeedback
              initialValue={data ? data.location : ''}
            >
              <Input
                className={styles.form_control}
                placeholder='Shivaji Nagar, Pune'
              />
            </Form.Item>
            <label className='form-label'>Office Department*</label>
            <Form.Item
              name='department'
              rules={[
                {
                  required: true,
                  message: 'Please input your Office Department',
                },
                {
                  min: 3,
                  message: 'Department can be more then 3 characters',
                },
              ]}
              hasFeedback
              initialValue={data ? data.department : ''}
            >
              <Input
                className={styles.form_control}
                placeholder='FrontEnd-Team'
              />
            </Form.Item>
            <div>
              <Checkbox
                checked={addSalaryData}
                onChange={() => {
                  setAddSalaryData(!addSalaryData);
                }}
              >
                Add Salary Data
              </Checkbox>
            </div>
            {addSalaryData && (
              <div className={styles.salaryblock}>
                <label className='form-label'>Salary</label>
                <Form.Item
                  name='salary'
                  style={{ padding: '0px 10px' }}
                  initialValue={
                    data && data.salary.salary ? data.salary.salary : ''
                  }
                >
                  <InputNumber
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    style={{ width: 150 }}
                  />
                </Form.Item>
                <Form.Item
                  name='tenure'
                  rules={[
                    {
                      required: addSalaryData ? true : false,
                      message: addSalaryData ? 'Please Select tenure' : '',
                    },
                  ]}
                  hasFeedback
                  initialValue={data && data.salary && data.salary.tenure}
                >
                  <Select style={{ width: 120 }}>
                    <Option value='/year'>/year</Option>
                    <Option value='/month'>/month</Option>
                    <Option value='/day'>/day</Option>
                    <Option value='/hour'>/hour</Option>
                  </Select>
                </Form.Item>
              </div>
            )}
            <label className='form-label'>Job Description*</label>
            <Form.Item
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Please input Job Description',
                },
                {
                  min: 3,
                  message: 'Description can be more then 3 characters',
                },
              ]}
              hasFeedback
              initialValue={
                data && data.jobDetails ? data.jobDetails.description : ''
              }
            >
              <Input.TextArea />
            </Form.Item>{' '}
            <label className='form-label'>About the Job*</label>
            <Form.Item
              name='aboutJob'
              initialValue={
                data && data.jobDetails ? data.jobDetails.aboutJob : ''
              }
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button className={styles.signBtn} htmlType='submit'>
                Create Job
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ModalAntd>
    </>
  );
};
