import Unauthorized from "components/Unauthorized";
import { PATH } from "constants/path";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthRoute = ({ children, roles }: { children: JSX.Element; roles: any }) => {
  const navigate = useNavigate();

  const userRole: any = localStorage.getItem('role');
  const uid: any = localStorage.getItem('uid');

  const userHasRequiredRole = userRole && roles.includes(userRole) ? true : false;

  if (!uid) {
    return <Navigate to={PATH.LOGIN} state={{ from: navigate }} />;
  }

  if (uid && !userHasRequiredRole) {
    return <Unauthorized />;
  }

  return children;
};