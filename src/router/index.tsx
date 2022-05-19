import Assign from "components/Assign";
import Dashboard from "components/Dashboard";
import IntervieweeDetails from "components/IntervieweeDetails";
import Home from "components/Home";
// import Login from "components/Login";
import Missing from "components/Missing";
import { PATH } from "constants/path";
import { ROLES } from "constants/roles";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { PublicRoute } from "./PublicRoute";
// const RegisterCompany = lazy(() => import('components/Register'));
const Login = lazy(() => import('components/Login'));
const Sidebar = lazy(() => import('components/Sidebar'));
// const Sidebar = lazy(() => import('components/Sidebar'));
// const Unauthorized = lazy(() => import('components/Unauthorized'));
// const Missing = lazy(() => import('components/Missing'));
// const SelectRole = lazy(() => import('components/SelectRole'));
// const Assign = lazy(() => import('components/Assign'));
// const Dashboard = lazy(() => import('components/Dashboard'));


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
            <Home />
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
        path={PATH.JOBS}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <Sidebar />
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
      <Route
        path={PATH.INTERVIEWEEDETAILS}
        element={
          <AuthRoute roles={[ROLES.HR]}>
            <IntervieweeDetails />
          </AuthRoute>
        }
      />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};