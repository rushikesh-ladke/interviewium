import Assign from '../components/Assign';
import Dashboard from '../components/Dashboard';
import IntervieweeDetails from '../components/IntervieweeDetails';
import Home from '../components/Home';
import Missing from '../components/Missing';
import { PATH } from '../constants/path';
import { ROLES } from '../constants/roles';
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from './AuthRoute';
import { PublicRoute } from './PublicRoute';
import { MainLayout } from '../components/MainLayout/MainLayout';
import Login from '../components/Login';
import Jobs from '../components/Jobs';
import SelectRole from '../components/SelectRole';
import OngoingInterviews from '../components/OngoingInterviews';
import Interviews from '../components/Interviews';
import Interviewer from '../components/Interviewer';
import Profile from '../components/Profile';
import Feedback from '../components/Feedback';
import Application from '../components/Application';
import JobDetails from '../components/JobDetails';
import Register from '../components/Register';

/**
 * Top level application router
 *
 * @returns {Component}
 */

export const Router = () => {
  return (
    <Routes>
      <Route
        path={PATH.HOMEPAGE}
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path={PATH.REGISTER_COMPANY}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path={PATH.JOB_DETAILS} element={<JobDetails />} />
      <Route
        path={PATH.HOME}
        element={
          <PublicRoute>
            <Login title={'Sign In'} signInPage={true} />
          </PublicRoute>
        }
      />
      <Route
        path={PATH.REGISTER}
        element={
          <PublicRoute>
            <Login title={'Sign up'} signInPage={false} />
          </PublicRoute>
        }
      />
      <Route
        path={PATH.SELECT_ROLE}
        element={
          <AuthRoute roles={[ROLES.TEMPUSER]}>
            <SelectRole />
          </AuthRoute>
        }
      />
      <Route
        path={PATH.ASSIGN}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <Assign />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.JOBS}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <Jobs />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.DASHBOARD}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE, ROLES.INTERVIEWER, ROLES.HR]}>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.INTERVIEWEE_DETAILS}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <IntervieweeDetails />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.ONGOING}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <OngoingInterviews />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.PREVIOUS}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <Interviews />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.INTERVIEWS}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE, ROLES.INTERVIEWER]}>
            <MainLayout>
              <Interviews />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.INTERVIEWER}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <MainLayout>
              <Interviewer />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.PROFILE}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE, ROLES.INTERVIEWER, ROLES.HR]}>
            <MainLayout>
              <Profile />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.FEEDBACK}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE, ROLES.INTERVIEWER]}>
            <MainLayout>
              <Feedback />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route
        path={PATH.APPLICATION}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE]}>
            <MainLayout>
              <Application />
            </MainLayout>
          </AuthRoute>
        }
      />
      <Route path='*' element={<Missing />} />
    </Routes>
  );
};
