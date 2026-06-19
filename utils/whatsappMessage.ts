import { Booking } from '../types';

export const buildWhatsAppMessage = (booking: Booking, businessPhone: string): string => {
  const dateStr = booking.bookingDate instanceof Date 
    ? booking.bookingDate.toDateString() 
    : new Date(booking.bookingDate).toDateString();
    
  const text = `Hi Saiscissors! 👋
I've just requested a new booking online.

*Booking ID:* ${booking.id}
*Service:* ${booking.serviceName}
*Stylist:* ${booking.barberName}
*Date:* ${dateStr}
*Time:* ${booking.timeSlot}
*My Name:* ${booking.customerName}
*Phone:* ${booking.customerPhone}

Please confirm my appointment. Thank you!`;

  return `https://wa.me/${businessPhone}?text=${encodeURIComponent(text)}`;
};
