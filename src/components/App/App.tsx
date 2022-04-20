import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATH } from 'constants/path';
import { Layout } from './Layout/Layout';
import RequiredAuth from './RequiredAuth/RequiredAuth';
import { ROLES } from 'constants/roles';
const Login = lazy(() => import('pages/user/Login'));
const Register = lazy(() => import('components/Register'));
const Sidebar = lazy(() => import('components/Sidebar'));
const Unauthorized = lazy(() => import('components/Unauthorized'));
const Missing = lazy(() => import('components/Missing'));
const SelectRole = lazy(() => import('components/SelectRole'));
const Assign = lazy(() => import('components/Assign'));
const Dashboard = lazy(() => import('components/Dashboard'));

export const App = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Layout />}>
        {/* public */}
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.UNAUTHORIZED} element={<Unauthorized />} />
        {/* protected */}
        <Route element={<RequiredAuth role={ROLES.HR} />}>
          <Route path={PATH.SIDEBAR} element={<Sidebar />} />
          <Route path={PATH.SELECTROLE} element={<SelectRole />} />
          <Route path={PATH.ASSIGN} element={<Assign />} />
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        </Route>
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
