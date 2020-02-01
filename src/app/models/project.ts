import { Milestone } from './Milestone';
import { UserPermission } from './user-permission';

export class Project {
  id: number;
  name: string;
  milestones: Milestone[];
  userPermissions: UserPermission[];
}
