import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { BOOKING_STATUS } from '../constants/bookingStatus';
import { Booking } from '../types';

export const analyticsRepository = {
  async getDashboardStats() {
    try {
      const q = query(collection(db, COLLECTIONS.BOOKINGS));
      const snap = await getDocs(q);
      const bookings = snap.docs.map(doc => doc.data() as Booking);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todaysBookings = bookings.filter(b => {
        const d = b.bookingDate instanceof Date ? b.bookingDate : new Date(b.bookingDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });

      const pendingRequests = bookings.filter(b => b.status === BOOKING_STATUS.PENDING).length;
      const confirmedAppointments = bookings.filter(b => b.status === BOOKING_STATUS.CONFIRMED).length;
      const completedServices = bookings.filter(b => b.status === BOOKING_STATUS.COMPLETED).length;

      // Calculate Most Booked Service
      const serviceCounts: Record<string, number> = {};
      bookings.forEach(b => {
        serviceCounts[b.serviceName] = (serviceCounts[b.serviceName] || 0) + 1;
      });
      const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      // Calculate Peak Hours
      const hourCounts: Record<string, number> = {};
      bookings.forEach(b => {
        hourCounts[b.timeSlot] = (hourCounts[b.timeSlot] || 0) + 1;
      });
      const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      // Calculate Top Barber
      const barberCounts: Record<string, number> = {};
      bookings.forEach(b => {
        barberCounts[b.barberName] = (barberCounts[b.barberName] || 0) + 1;
      });
      const topBarber = Object.entries(barberCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      return {
        todaysBookings: todaysBookings.length,
        pendingRequests,
        confirmedAppointments,
        completedServices,
        totalCustomers: new Set(bookings.map(b => b.customerPhone)).size,
        topService,
        peakHour,
        topBarber,
        totalBookings: bookings.length
      };
    } catch (error) {
      console.error('Failed to get dashboard stats', error);
      return null;
    }
  }
};
