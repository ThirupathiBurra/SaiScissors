import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { ShopContent } from '../types';

const CONTENT_DOC_ID = 'shop-config';
const getDocRef = () => doc(db, COLLECTIONS.SETTINGS, CONTENT_DOC_ID);

export const contentRepository = {
  async getContent(): Promise<ShopContent | null> {
    const snap = await getDoc(getDocRef());
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ShopContent;
    }
    return null;
  },

  async saveContent(data: Omit<ShopContent, 'id'>): Promise<void> {
    await setDoc(getDocRef(), data, { merge: true });
  },

  subscribeToContent(callback: (content: ShopContent | null) => void) {
    return onSnapshot(getDocRef(), (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as ShopContent);
      } else {
        callback(null);
      }
    });
  }
};
