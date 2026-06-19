import { useState, useEffect } from 'react';
import { Booking } from '../types';
import { bookingRepository } from '../repositories/bookingRepository';

const today = new Date();
const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

const DEMO_BOOKINGS: Booking[] = [
  { id: 'demo-1', customerName: 'Rahul Kumar', customerPhone: '+91 98765 43210', serviceId: 'svc-1', serviceName: 'Classic Haircut', barberId: 'b-1', barberName: 'Ravi', bookingDate: today, timeSlot: '10:00 AM', status: 'CONFIRMED', notes: '', createdAt: today },
  { id: 'demo-2', customerName: 'Suresh Reddy', customerPhone: '+91 97654 32109', serviceId: 'svc-2', serviceName: 'Beard Styling', barberId: 'b-2', barberName: 'Mahesh', bookingDate: today, timeSlot: '11:30 AM', status: 'PENDING', notes: '', createdAt: today },
  { id: 'demo-3', customerName: 'Arjun Nair', customerPhone: '+91 96543 21098', serviceId: 'svc-3', serviceName: 'Hair Spa', barberId: 'b-3', barberName: 'Ajay', bookingDate: today, timeSlot: '1:00 PM', status: 'CONFIRMED', notes: 'Deep conditioning requested', createdAt: today },
  { id: 'demo-4', customerName: 'Vikram Patel', customerPhone: '+91 95432 10987', serviceId: 'svc-4', serviceName: 'Fade Cut', barberId: 'b-1', barberName: 'Ravi', bookingDate: today, timeSlot: '3:00 PM', status: 'PENDING', notes: '', createdAt: today },
  { id: 'demo-5', customerName: 'Naveen G.', customerPhone: '+91 94321 09876', serviceId: 'svc-1', serviceName: 'Classic Haircut + Wash', barberId: 'b-2', barberName: 'Mahesh', bookingDate: today, timeSlot: '4:30 PM', status: 'CONFIRMED', notes: '', createdAt: today },
  { id: 'demo-6', customerName: 'Kiran Desai', customerPhone: '+91 93210 98765', serviceId: 'svc-5', serviceName: 'Facial', barberId: 'b-3', barberName: 'Ajay', bookingDate: tomorrow, timeSlot: '10:00 AM', status: 'PENDING', notes: '', createdAt: today },
  { id: 'demo-7', customerName: 'Manoj Tiwari', customerPhone: '+91 92109 87654', serviceId: 'svc-2', serviceName: 'Beard Trim', barberId: 'b-1', barberName: 'Ravi', bookingDate: tomorrow, timeSlot: '12:00 PM', status: 'CONFIRMED', notes: '', createdAt: today },
  { id: 'demo-8', customerName: 'Sai Ram', customerPhone: '+91 91098 76543', serviceId: 'svc-3', serviceName: 'Hair Spa', barberId: 'b-2', barberName: 'Mahesh', bookingDate: tomorrow, timeSlot: '2:30 PM', status: 'CANCELLED', notes: 'Customer called to cancel', createdAt: today },
];

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = bookingRepository.subscribeToBookings((data) => {
      // Use demo data when Firestore returns empty
      setBookings(data.length > 0 ? data : DEMO_BOOKINGS);
      setLoading(false);
    });

    // Fallback: if Firestore fails or is slow, show demo data after 3s
    const fallbackTimer = setTimeout(() => {
      setBookings(prev => prev.length === 0 ? DEMO_BOOKINGS : prev);
      setLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const updateStatus = async (id: string, status: Booking['status']) => {
    // For demo bookings, update locally
    if (id.startsWith('demo-')) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      return;
    }
    await bookingRepository.updateBookingStatus(id, status);
  };

  return {
    bookings,
    loading,
    updateStatus,
  };
};
