import Assign from "components/Assign";
import Dashboard from "components/Dashboard";
import Home from "components/Home";
import Login from "components/Login";
import Missing from "components/Missing";
import { PATH } from "constants/path";
import { ROLES } from "constants/roles";
import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { PublicRoute } from "./PublicRoute";


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
            <Home/>
          </PublicRoute>
        }
      />
      <Route
        path={PATH.HOME}
        element={
          <PublicRoute>
            <Login title={"Sign In"} signInPage={true} />
          </PublicRoute>
        }
      />
      <Route
        path={PATH.REGISTER}
        element={
          <PublicRoute>
            <Login title={"Sign up"} signInPage={false} />
          </PublicRoute>
        }
      />
      <Route
        path={PATH.ASSIGN}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path={PATH.DASHBOARD}
        element={
          <AuthRoute roles={[ROLES.INTERVIEWEE, ROLES.INTERVIEWER]}>
            <Assign />
          </AuthRoute>
        }
      />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};