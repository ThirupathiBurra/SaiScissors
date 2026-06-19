export const USER_ROLES = {
  ADMIN: 'ADMIN',
  BARBER: 'BARBER',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
