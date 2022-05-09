import { PATH } from "constants/path";
import { ROLES } from "constants/roles";
import { Navigate, useNavigate } from "react-router-dom";


export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const userRole: any = localStorage.getItem('role');

  const dashboard : any = userRole === ROLES.HR ? PATH.DASHBOARD : userRole === ROLES.INTERVIEWEE ?  PATH.ASSIGN :  userRole === ROLES.INTERVIEWER ? PATH.DASHBOARD : null;

  if (userRole) {
    return <Navigate to={dashboard} state={{ from: navigate }} />;
  }

  return children;
};