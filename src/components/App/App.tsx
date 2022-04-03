import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATH } from 'constants/path';
import { Layout } from './Layout';
const Login = lazy(() => import('components/Login'));
const Register = lazy(() => import('components/Register'));
const Sidebar = lazy(() => import('components/Sidebar'));

export const App = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Layout />}>
        {/* public */}
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        {/* protected */}
        <Route path={PATH.HOME} element={<Sidebar />} />
      </Route>
    </Routes>
  );
};
