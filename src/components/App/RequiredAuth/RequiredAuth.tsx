import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { PATH } from 'constants/path';

const RequiredAuth = ({ role }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return auth?.role === role && auth.role !== '' ? (
    <Outlet />
  ) : auth?.userId === '' ? (
    <Navigate to={PATH.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
