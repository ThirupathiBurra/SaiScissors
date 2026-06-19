import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Offer } from '../types';

const getCollection = () => collection(db, COLLECTIONS.OFFERS);

export const offerRepository = {
  async createOffer(data: Omit<Offer, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateOffer(docId: string, data: Partial<Offer>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.OFFERS, docId);
    await updateDoc(docRef, data);
  },

  async softDeleteOffer(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.OFFERS, docId);
    await updateDoc(docRef, { active: false });
  },

  subscribeToOffers(callback: (offers: Offer[]) => void) {
    const q = query(getCollection(), orderBy('displayOrder', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const offers = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Offer[];
      callback(offers);
    });
  }
};
