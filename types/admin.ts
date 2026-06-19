import { UserRole } from '../constants/roles';

export interface AdminUser {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: Date | string;
}
