import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PATH } from '../../../constants/path';

const RequiredAuth = ({ role }: any) => {
  const location = useLocation();
  const userRole: any = localStorage.getItem('role');
  const uid: any = localStorage.getItem('uid');

  return userRole === role && userRole !== '' ? (
    <Outlet />
  ) : uid === '' ? (
    <Navigate to={PATH.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
