import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { GalleryItem } from '../types';

const getCollection = () => collection(db, COLLECTIONS.GALLERY);

export const galleryRepository = {
  async createItem(data: Omit<GalleryItem, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateItem(docId: string, data: Partial<GalleryItem>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.GALLERY, docId);
    await updateDoc(docRef, data);
  },

  async softDeleteItem(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.GALLERY, docId);
    await updateDoc(docRef, { active: false });
  },

  subscribeToGallery(callback: (items: GalleryItem[]) => void) {
    const q = query(getCollection(), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as GalleryItem[];
      callback(items);
    });
  }
};
