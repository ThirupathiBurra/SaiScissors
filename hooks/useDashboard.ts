import { useBookings } from './useBookings';
import { BOOKING_STATUS } from '../constants/bookingStatus';

export const useDashboard = () => {
  const { bookings, loading: bookingsLoading } = useBookings();

  // Calculate stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysBookings = bookings.filter(b => {
    const d = b.bookingDate instanceof Date ? b.bookingDate : new Date(b.bookingDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const pendingRequests = bookings.filter(b => b.status === BOOKING_STATUS.PENDING);
  const confirmedAppointments = bookings.filter(b => b.status === BOOKING_STATUS.CONFIRMED);
  const completedServices = bookings.filter(b => b.status === BOOKING_STATUS.COMPLETED);

  return {
    stats: {
      todaysBookings: todaysBookings.length,
      pendingRequests: pendingRequests.length,
      confirmedAppointments: confirmedAppointments.length,
      completedServices: completedServices.length,
      totalCustomers: new Set(bookings.map(b => b.customerPhone)).size,
    },
    recentBookings: bookings.slice(0, 5),
    loading: bookingsLoading,
  };
};
