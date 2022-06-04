//TODO
import { ROLES } from 'constants/roles';
import {
  AssignAggregate,
  DashboardAggregate,
  InterviewerAggregate,
  JobsAggregate,
  OngoingInterviewsAggregate,
  PreviousInterviewsAggregate,
} from './HR';

const HRRoutes = [
  { ...DashboardAggregate },
  { ...JobsAggregate },
  { ...AssignAggregate },
  { ...InterviewerAggregate },
  { ...OngoingInterviewsAggregate },
  { ...PreviousInterviewsAggregate },
];

const securedRoutes = new Map<any, any>();

securedRoutes.set(ROLES.HR, HRRoutes);

export { securedRoutes };
