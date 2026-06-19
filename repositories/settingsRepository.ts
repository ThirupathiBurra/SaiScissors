import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { ShopSettings } from '../types';

const SETTINGS_DOC_ID = 'global';
const getDocRef = () => doc(db, COLLECTIONS.SETTINGS, SETTINGS_DOC_ID);

export const settingsRepository = {
  async getSettings(): Promise<ShopSettings | null> {
    const snap = await getDoc(getDocRef());
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ShopSettings;
    }
    return null;
  },

  async saveSettings(data: Omit<ShopSettings, 'id'>): Promise<void> {
    await setDoc(getDocRef(), data, { merge: true });
  },

  subscribeToSettings(callback: (settings: ShopSettings | null) => void) {
    return onSnapshot(getDocRef(), (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as ShopSettings);
      } else {
        callback(null);
      }
    });
  }
};
