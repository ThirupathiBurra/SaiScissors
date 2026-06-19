import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy, where } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Notification } from '../types';

const getCollection = () => collection(db, COLLECTIONS.NOTIFICATIONS);

export const notificationRepository = {
  async sendNotification(data: Omit<Notification, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async markAsRead(docId: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, docId);
    await updateDoc(docRef, { read: true });
  },

  subscribeToUnread(recipientType: Notification['recipientType'], callback: (notifications: Notification[]) => void) {
    const q = query(
      getCollection(), 
      where('recipientType', '==', recipientType),
      where('read', '==', false),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Notification[];
      callback(notes);
    });
  }
};
