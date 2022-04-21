import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATH } from 'constants/path';
import { Layout } from './Layout/Layout';
import RequiredAuth from './RequiredAuth/RequiredAuth';
import { ROLES } from 'constants/roles';
const Login = lazy(() => import('pages/user/Login'));
const Register = lazy(() => import('pages/user/Register'));
const RegisterCompany = lazy(() => import('components/Register'));
const Sidebar = lazy(() => import('components/Sidebar'));
const Unauthorized = lazy(() => import('components/Unauthorized'));
const Missing = lazy(() => import('components/Missing'));
const SelectRole = lazy(() => import('components/SelectRole'));
const Assign = lazy(() => import('components/Assign'));
const Dashboard = lazy(() => import('components/Dashboard'));

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
    <Routes>
      <Route path={PATH.HOME} element={<Layout />}>
        {/* public */}
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER_COMPANY} element={<RegisterCompany />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.UNAUTHORIZED} element={<Unauthorized />} />
        {/* protected */}
        {userRole === ROLES.HR
          ? userRoutes.HR()
          : userRole === ROLES.TEMPUSER
          ? userRoutes.TEMPUSER()
          : userRole === ROLES.INTERVIEWEE
          ? userRoutes.INTERVIEWEE()
          : userRole === ROLES.INTERVIEWER
          ? userRoutes.INTERVIEWER()
          : null}
        {/* tobe added when new roles come in */}

        {/* <Route element={<RequiredAuth role={ROLES.INTERVIEWER}  />}>
          <Route path={PATH.HOME} element={<Sidebar />} />
        </Route>

        <Route element={<RequiredAuth role={ROLES.INTERVIEWEE}  />}>
          <Route path={PATH.HOME} element={<Sidebar />} />
        </Route> */}

        {/* catch all */}
        <Route path={PATH.MISSING} element={<Missing />} />
      </Route>
    </Routes>
  );
};
