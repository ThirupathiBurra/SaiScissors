import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Booking } from '../types';
import { generateBookingId } from '../utils/generateBookingId';

const getCollection = () => collection(db, COLLECTIONS.BOOKINGS);

export const bookingRepository = {
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<string> {
    const customId = generateBookingId();
    
    const docRef = await addDoc(getCollection(), {
      ...bookingData,
      id: customId,
      createdAt: Timestamp.now()
    });
    
    return customId;
  },

  async updateBookingStatus(docId: string, status: Booking['status']): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, docId);
    await updateDoc(docRef, { status });
  },

  subscribeToBookings(callback: (bookings: Booking[]) => void) {
    const q = query(getCollection(), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const bookings: Booking[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          docId: doc.id,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          bookingDate: data.bookingDate?.toDate?.() || data.bookingDate,
        } as Booking & { docId: string };
      });
      callback(bookings);
    });
  }
};
