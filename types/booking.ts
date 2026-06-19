import { BookingStatus } from '../constants/bookingStatus';

export interface Booking {
  id?: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  customerName: string;
  customerPhone: string;
  customerTag?: 'NEW' | 'REGULAR' | 'VIP';
  internalNote?: string;
  bookingDate: Date | string; // Use string for serialized dates in components, Date for Firestore
  timeSlot: string; // e.g., "10:30 AM"
  status: BookingStatus;
  createdAt: Date | string;
  notes?: string;
}
