import { addDoc, collection, doc, deleteDoc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Banner } from '../types';

const getCollection = () => collection(db, COLLECTIONS.BANNERS);

export const bannerRepository = {
  async createBanner(data: Omit<Banner, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateBanner(docId: string, data: Partial<Banner>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BANNERS, docId);
    await updateDoc(docRef, data);
  },

  async softDeleteBanner(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BANNERS, docId);
    await updateDoc(docRef, { active: false });
  },

  subscribeToBanners(callback: (banners: Banner[]) => void) {
    const q = query(getCollection(), orderBy('priority', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const banners = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Banner[];
      callback(banners);
    });
  }
};
