import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Booking } from '../types';

export const insightsRepository = {
  /**
   * Translates raw metrics into human-readable insights for Admin Dashboard
   * Future-proofed for AI ingestion
   */
  async getHumanReadableInsights(): Promise<string[]> {
    try {
      const q = query(collection(db, COLLECTIONS.BOOKINGS));
      const snap = await getDocs(q);
      const bookings = snap.docs.map(doc => doc.data() as Booking);

      const insights: string[] = [];

      if (bookings.length === 0) {
        insights.push("No bookings found yet. Keep marketing!");
        return insights;
      }

      // 1. Most Booked Service
      const serviceCounts: Record<string, number> = {};
      bookings.forEach(b => {
        serviceCounts[b.serviceName] = (serviceCounts[b.serviceName] || 0) + 1;
      });
      const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0];
      if (topService) {
        insights.push(`The most booked service is ${topService[0]} with ${topService[1]} requests.`);
      }

      // 2. Peak Hour
      const hourCounts: Record<string, number> = {};
      bookings.forEach(b => {
        hourCounts[b.timeSlot] = (hourCounts[b.timeSlot] || 0) + 1;
      });
      const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
      if (peakHour) {
        insights.push(`Peak hours are consistently around ${peakHour[0]}.`);
      }

      // 3. Most Active Barber
      const barberCounts: Record<string, number> = {};
      bookings.forEach(b => {
        barberCounts[b.barberName] = (barberCounts[b.barberName] || 0) + 1;
      });
      const topBarber = Object.entries(barberCounts).sort((a, b) => b[1] - a[1])[0];
      if (topBarber) {
        insights.push(`${topBarber[0]} has handled the most customers (${topBarber[1]} bookings).`);
      }

      return insights;
    } catch (error) {
      console.error('Failed to generate insights', error);
      return ["Insights currently unavailable."];
    }
  }
};
