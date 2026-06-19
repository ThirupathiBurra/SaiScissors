import { addDoc, collection, doc, deleteDoc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Service } from '../types';

const getCollection = () => collection(db, COLLECTIONS.SERVICES);

export const serviceRepository = {
  async createService(data: Omit<Service, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateService(docId: string, data: Partial<Service>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.SERVICES, docId);
    await updateDoc(docRef, data);
  },

  async softDeleteService(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.SERVICES, docId);
    await updateDoc(docRef, { active: false });
  },

  subscribeToServices(callback: (services: Service[]) => void) {
    const q = query(getCollection(), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Service[];
      callback(services);
    });
  }
};
