import { useState, useEffect } from 'react';
import { Button, Spin, Typography } from 'antd';

import styles from './styles.module.scss';
import Avatar from '../../images/avatar.svg';
import TvIcon from '@mui/icons-material/Tv';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { mockData } from './mockData';
import { getSingleDocument } from '../../functions/getUserProfile';
import { DOCUMENTS } from '../../constants/firebase-docs';
import { useSearchParams } from 'react-router-dom';
import { createDocument } from '../../functions/setDoc';

export const IntervieweeDetails = () => {
  const [searchParams] = useSearchParams();
  const { Paragraph } = Typography;
  const userId = localStorage.getItem('uid');

  const editConfig: any = {
    icon: <AutoFixHighIcon />,
  };

  const [editable, setEditable] = useState<any>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    editableHandler();
    getUserResume();
  }, []);

  const editableHandler = () => {
    if (userId === searchParams.get('id')) {
      setEditable(true);
    }
  };

  const getUserResume = async () => {
    const resume: any = await getSingleDocument(userId, DOCUMENTS.RESUME);
    if (resume.data === null && resume.error !== '') {
      setData(mockData);
    } else {
      try {
        const resumeData = JSON.parse(resume.data.resume);
        setData(resumeData);
      } catch {
        setData(mockData);
      }
    }
  };

  const onChangeData = (values: any, field: any) => {
    const some: any = {};
    some[`${field}`] = values;
    setData({ ...data, ...some });
  };

  const onChangeNestedData = (
    value: any,
    id: any,
    field: any,
    subfield: any,
    subCat?: any,
    subId?: any
  ) => {
    const some: any = {};
    some[`${subfield}`] = value;
    let dataOnChange = data;
    if (subCat) {
      dataOnChange = data[field].map((e: any) => {
        if (e.id === id) {
          return {
            ...e,
            moreInfo: e?.moreInfo.map((e1: any) => {
              if (e1.id === subId) {
                return { ...e1, ...some };
              } else {
                return e1;
              }
            }),
          };
        } else {
          return e;
        }
      });
    } else {
      dataOnChange = data[field].map((e: any) => {
        if (e.id === id) {
          return { ...e, ...some };
        } else {
          return e;
        }
      });
    }

    data[field] = dataOnChange;
    setData({ ...data });
  };

  const saveResumeProgress = () => {
    const resume = JSON.stringify(data);
    createDocument(DOCUMENTS.RESUME, userId, { resume: resume });
  };

  return (
    <>
      <div className={`${styles.appMain}`}>
        {data === null ? (
          <Spin />
        ) : (
          <div className={styles.appBody}>
            <Button
              type='primary'
              className={styles.fixedButton}
              onClick={() => {
                saveResumeProgress();
              }}
            >
              Save the Progress
            </Button>

            <div className='row'>
              <div className='col-lg-9'>
                <div className={styles.DetailsMain}>
                  <img
                    src={Avatar}
                    alt='User Avatar'
                    className={styles.userAvatar}
                  />
                  <h1 className={styles.UserName}>
                    <Paragraph
                      editable={
                        editable
                          ? {
                              onChange: (values: any) =>
                                onChangeData(values, 'name'),
                              ...editConfig,
                            }
                          : false
                      }
                    >
                      {data?.name}
                    </Paragraph>
                  </h1>
                  <div className={styles.userPoint}>
                    <Paragraph
                      editable={
                        editable
                          ? {
                              onChange: (values: any) =>
                                onChangeData(values, 'headLine'),
                              ...editConfig,
                            }
                          : false
                      }
                    >
                      {data?.headLine}
                    </Paragraph>
                  </div>
                  <div className='row mb-4'>
                    <div className='col-lg-6'>
                      <video className={styles.videoN} controls />
                      <source src='https://www.loom.com/share/0101524fe5d243beb368bd5e47d7df44' />
                    </div>
                    <div className='col-lg-6'>
                      <div className={styles.roleInfo}>
                        <h5>
                          <Paragraph
                            editable={
                              editable
                                ? {
                                    onChange: (values: any) =>
                                      onChangeData(values, 'currentJobTitle'),
                                    ...editConfig,
                                  }
                                : false
                            }
                          >
                            {data?.currentJobTitle}
                          </Paragraph>
                        </h5>
                        <h6>
                          {' '}
                          <Paragraph
                            editable={
                              editable
                                ? {
                                    onChange: (values: any) =>
                                      onChangeData(
                                        values,
                                        'companyAndLocation'
                                      ),
                                    ...editConfig,
                                  }
                                : false
                            }
                          >
                            {data?.companyAndLocation}
                          </Paragraph>
                        </h6>
                        <p>
                          <Paragraph
                            editable={
                              editable
                                ? {
                                    onChange: (values: any) =>
                                      onChangeData(values, 'jobRole'),
                                    ...editConfig,
                                  }
                                : false
                            }
                          >
                            {data?.jobRole}
                          </Paragraph>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.TopSkills}>
                    <h2>
                      <TvIcon className={styles.icon} />
                      Top Skills
                    </h2>
                    {data &&
                      data.skills.map((e: any) => {
                        return (
                          <div className={styles.info}>
                            <h4>
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'skills',
                                            'name'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.name}
                              </Paragraph>
                            </h4>
                            <h6>
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'skills',
                                            'experience'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.experience}
                              </Paragraph>
                            </h6>
                            <p>
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'skills',
                                            'description'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.description}
                              </Paragraph>{' '}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.StackExp}>
                    <h2>Stack Experience</h2>
                    {data &&
                      data?.moreInformation.map((e: any) => {
                        return (
                          <h6>
                            <Paragraph
                              editable={
                                editable
                                  ? {
                                      onChange: (values: any) =>
                                        onChangeNestedData(
                                          values,
                                          e.id,
                                          'moreInformation',
                                          'content'
                                        ),
                                      ...editConfig,
                                    }
                                  : false
                              }
                            >
                              {e.content === '' ? null : e.content}
                            </Paragraph>
                          </h6>
                        );
                      })}
                  </div>
                  <div className={styles.edu}>
                    <h2>Education</h2>
                    {data &&
                      data?.education.map((e: any) => {
                        return (
                          <h6>
                            <Paragraph
                              editable={
                                editable
                                  ? {
                                      onChange: (values: any) =>
                                        onChangeNestedData(
                                          values,
                                          e.id,
                                          'education',
                                          'content'
                                        ),
                                      ...editConfig,
                                    }
                                  : false
                              }
                            >
                              {e.content === '' ? null : e.content}
                            </Paragraph>
                          </h6>
                        );
                      })}
                  </div>
                  <div className={styles.profExp}>
                    <div className='d-flex justify-content-between'>
                      <h2>Professional Experience / Projects</h2>
                      <h5>
                        <Paragraph
                          editable={
                            editable
                              ? {
                                  onChange: (values: any) =>
                                    onChangeData(
                                      values,
                                      'professionalExperience'
                                    ),
                                  ...editConfig,
                                }
                              : false
                          }
                        >
                          {data?.professionalExperience}
                        </Paragraph>
                      </h5>
                    </div>
                    {data &&
                      data?.job.map((e: any) => {
                        return (
                          <div className={styles.info}>
                            <h5>
                              {' '}
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'job',
                                            'nameAndPosition'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.nameAndPosition}
                              </Paragraph>
                            </h5>
                            <h6>
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'job',
                                            'tenure'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.tenure}
                              </Paragraph>
                            </h6>
                            <p>
                              <Paragraph
                                editable={
                                  editable
                                    ? {
                                        onChange: (values: any) =>
                                          onChangeNestedData(
                                            values,
                                            e.id,
                                            'job',
                                            'description'
                                          ),
                                        ...editConfig,
                                      }
                                    : false
                                }
                              >
                                {e?.description}
                              </Paragraph>{' '}
                            </p>
                            <div className={styles.infoStack}>
                              <p>
                                <Paragraph
                                  editable={
                                    editable
                                      ? {
                                          onChange: (values: any) =>
                                            onChangeNestedData(
                                              values,
                                              e.id,
                                              'job',
                                              'roleInCompany'
                                            ),
                                          ...editConfig,
                                        }
                                      : false
                                  }
                                >
                                  {e?.roleInCompany}
                                </Paragraph>
                              </p>
                              <ul>
                                {e?.moreInfo?.map((e1: any) => {
                                  return (
                                    <li>
                                      <Paragraph
                                        editable={
                                          editable
                                            ? {
                                                onChange: (values: any) =>
                                                  onChangeNestedData(
                                                    values,
                                                    e.id,
                                                    'job',
                                                    'content',
                                                    'moreInfo',
                                                    e1.id
                                                  ),
                                                ...editConfig,
                                              }
                                            : false
                                        }
                                      >
                                        {e1.content === '' ? null : e1.content}
                                      </Paragraph>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className='col-lg-2'></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
