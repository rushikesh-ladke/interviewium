import { Button, Form, Input, Modal, Radio, InputNumber, Checkbox } from 'antd';
import { serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { createUpdateJob } from '../jobs-api';
import styles from '../styles.module.scss';

export const CreateJob = ({ isModalVisible, handleOk, handleCancel }: any) => {
  const ModalAntd: any = Modal;
  const [form] = Form.useForm();

  const userID: any = localStorage.getItem('uid');

  const [HREmail, setHREmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [addSalaryData, setAddSalaryData] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const onFinish = (values: any) => {
    const data = {
      ...values,
      companyName: companyName,
      HREmail: HREmail,
      HRid: userID,
      currency: '₹',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    createUpdateJob(data);
    form.resetFields();
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

  const selectAfter = <div>₹</div>;
  const selectBefore = <div>~</div>;

  return (
    <>
      <ModalAntd
        title='Create a free job'
        visible={isModalVisible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        className={styles.modalAnt}
        bodyStyle={{ innerHeight: 1000 }}
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
            >
              <Input
                className={styles.form_control}
                placeholder='Software Developer'
              />
            </Form.Item>
            <div className='d-flex justify-content-between'>
              <div>
                {' '}
                <label className='form-label'>Min Experience*</label>
                <Form.Item
                  name='minExp'
                  rules={[
                    { required: true, message: 'Please input Min Experience' },
                  ]}
                >
                  <InputNumber addonBefore={selectBefore} placeholder='0' />
                </Form.Item>
              </div>
              <div>
                <label className='form-label'>Max Experience*</label>
                <Form.Item
                  name='maxExp'
                  rules={[
                    { required: true, message: 'Please input Max Experience' },
                  ]}
                >
                  <InputNumber addonBefore={selectBefore} placeholder='1' />
                </Form.Item>
              </div>
            </div>
            <Form.Item label='Job Type' name='jobType'>
              <Radio.Group>
                <Radio.Button value='Full-time'>Full-time</Radio.Button>
                <Radio.Button value='Part-time'>Part-time</Radio.Button>
                <Radio.Button value='Contract'>Contract</Radio.Button>
                <Radio.Button value='Internship'>Internship</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Workspace Type' name='workspaceType'>
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
                <Form.Item name='salary'>
                  <InputNumber addonAfter={selectAfter} placeholder='350000' />
                </Form.Item>
                <Form.Item
                  name='tenure'
                  rules={[
                    {
                      required: addSalaryData ? true : false,
                      message: addSalaryData
                        ? 'Please input your Office Department'
                        : '',
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder='per year' />
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
            >
              <Input.TextArea />
            </Form.Item>{' '}
            <label className='form-label'>About the Job*</label>
            <Form.Item name='aboutJob'>
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
