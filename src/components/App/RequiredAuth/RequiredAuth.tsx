import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { PATH } from 'constants/path';

const RequiredAuth = ({ role }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  const token = window.localStorage.getItem('accessToken');
  const uid = window.localStorage.getItem('uid');

  return auth?.role === role || uid ? (
    <Outlet />
  ) : auth?.user || token ? (
    <Navigate to={PATH.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
