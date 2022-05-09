import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATH } from 'constants/path';
import { Layout } from './Layout/Layout';
import RequiredAuth from './RequiredAuth/RequiredAuth';
import { ROLES } from 'constants/roles';
import { Router } from 'router';
const Login = lazy(() => import('pages/user/Login'));
const Register = lazy(() => import('pages/user/Register'));
const RegisterCompany = lazy(() => import('components/Register'));
const Sidebar = lazy(() => import('components/Sidebar'));
const Unauthorized = lazy(() => import('components/Unauthorized'));
const Missing = lazy(() => import('components/Missing'));
const SelectRole = lazy(() => import('components/SelectRole'));
const Assign = lazy(() => import('components/Assign'));
const Dashboard = lazy(() => import('components/Dashboard'));
const ScheduleInterview = lazy(() => import('components/ScheduleInterview'));

export const App = () => {
  const userRole: any = localStorage.getItem('role');

  const userRoutes = {
    HR: () => {
      return (
        <Route element={<RequiredAuth role={ROLES.HR} />}>
          <Route path={PATH.SIDEBAR} element={<Sidebar />} />
          <Route path={PATH.SELECTROLE} element={<SelectRole />} />
          <Route path={PATH.ASSIGN} element={<Assign />} />
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
          <Route path={PATH.SCHEDULE_INTERVIEW} element={<ScheduleInterview />} />
        </Route>
      );
    },
    TEMPUSER: () => {
      return (
        <Route element={<RequiredAuth role={ROLES.TEMPUSER} />}>
          <Route path={PATH.SELECTROLE} element={<SelectRole />} />
        </Route>
      );
    },
    INTERVIEWEE: () => {
      return (
        <Route element={<RequiredAuth role={ROLES.INTERVIEWEE} />}>
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        </Route>
      );
    },
    INTERVIEWER: () => {
      return (
        <Route element={<RequiredAuth role={ROLES.INTERVIEWER} />}>
          <Route path={PATH.SELECTROLE} element={<SelectRole />} />
        </Route>
      );
    },
  };

  return (
        <Router />
  );
};

