import { addDoc, collection, doc, deleteDoc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Barber } from '../types';

const getCollection = () => collection(db, COLLECTIONS.BARBERS);

export const barberRepository = {
  async createBarber(data: Omit<Barber, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateBarber(docId: string, data: Partial<Barber>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BARBERS, docId);
    await updateDoc(docRef, data);
  },

  async deleteBarber(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BARBERS, docId);
    await deleteDoc(docRef);
  },

  subscribeToBarbers(callback: (barbers: Barber[]) => void) {
    const q = query(getCollection(), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const barbers = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Barber[];
      callback(barbers);
    });
  }
};
