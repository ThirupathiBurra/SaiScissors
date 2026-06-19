import { USER_ROLES, UserRole } from './roles';

export const PERMISSIONS = {
  MANAGE_BOOKINGS: [USER_ROLES.ADMIN, USER_ROLES.BARBER],
  MANAGE_SERVICES: [USER_ROLES.ADMIN],
  MANAGE_BARBERS: [USER_ROLES.ADMIN],
  MANAGE_SETTINGS: [USER_ROLES.ADMIN],
} as const;

export const hasPermission = (userRole: UserRole, allowedRoles: readonly UserRole[]) => {
  return allowedRoles.includes(userRole);
};
