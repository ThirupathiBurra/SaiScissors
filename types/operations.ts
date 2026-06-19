export interface WaitlistEntry {
  id?: string;
  name: string;
  phone: string;
  service: string;
  preferredTime: string;
  status: 'WAITING' | 'NOTIFIED' | 'BOOKED' | 'CANCELLED';
  createdAt: string | Date;
}

export interface DailyNote {
  id?: string;
  date: string; // YYYY-MM-DD
  note: string;
  authorId: string;
  createdAt: string | Date;
}

export interface ActivityLog {
  id?: string;
  userId: string;
  action: string;
  entity: string;
  metadata?: any;
  undoAvailable: boolean;
  previousValue?: any;
  newValue?: any;
  timestamp: string | Date;
}

export interface NotificationTemplate {
  id?: string;
  type: 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED' | 'BOOKING_REMINDER' | 'THANK_YOU' | string;
  title: string;
  messageTemplate: string; // e.g. "Hi {name}, your booking for {service} is confirmed."
  active: boolean;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  recipientType: 'ADMIN' | 'BARBER' | 'CUSTOMER';
  recipientId?: string; // empty if broadcast to all admins
  read: boolean;
  type: string;
  createdAt: string | Date;
}
