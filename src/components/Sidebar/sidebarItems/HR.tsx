//TODO

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';

import Dashboard from '../../../components/Dashboard';
import { PATH } from '../../../constants/path';

interface Properties {
  icon: any;
  component: any;
  route: any;
  text: any;
}

const DashboardAggregate: Properties = {
  icon: DashboardOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Dashboard`,
};
const JobsAggregate: Properties = {
  icon: WorkOutlineOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Jobs`,
};
const AssignAggregate: Properties = {
  icon: AssignmentIndOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Assign`,
};
const InterviewerAggregate: Properties = {
  icon: PersonPinOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Interviewer`,
};
const OngoingInterviewsAggregate: Properties = {
  icon: ListAltOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Ongoing Interviews`,
};
const PreviousInterviewsAggregate: Properties = {
  icon: AppRegistrationOutlinedIcon,
  component: Dashboard,
  route: PATH.DASHBOARD,
  text: `Previous Interviews`,
};

export {
  DashboardAggregate,
  JobsAggregate,
  AssignAggregate,
  InterviewerAggregate,
  OngoingInterviewsAggregate,
  PreviousInterviewsAggregate,
};
