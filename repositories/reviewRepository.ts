import { collection, doc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Review } from '../types';

const getCollection = () => collection(db, COLLECTIONS.REVIEWS);

export const reviewRepository = {
  async updateStatus(docId: string, active: boolean, isVerified: boolean): Promise<void> {
    const docRef = doc(db, COLLECTIONS.REVIEWS, docId);
    await updateDoc(docRef, { active, isVerified });
  },

  async deleteReview(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.REVIEWS, docId);
    await deleteDoc(docRef);
  },

  subscribeToReviews(callback: (reviews: Review[]) => void) {
    const q = query(getCollection(), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Review[];
      callback(reviews);
    });
  }
};
