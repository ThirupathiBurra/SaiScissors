import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Service } from '../types';
import { cacheRepository } from '../repositories/cacheRepository';
import { SERVICES as fallbackServices } from '../lib/constants';

export const usePublicServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const cached = cacheRepository.get<Service[]>('public_services');
        if (cached) {
          setServices(cached);
          // Don't set loading to false yet, we'll try to fetch fresh data
        }

        const q = query(
          collection(db, COLLECTIONS.SERVICES), 
          where('active', '==', true),
          orderBy('order', 'asc')
        );
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const freshData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
          setServices(freshData);
          cacheRepository.set('public_services', freshData);
        } else if (!cached) {
          // If firestore is empty and no cache, use constants
          setServices(fallbackServices as any[]); // Temporary type cast to match schema
        }
      } catch (error) {
        console.error('Failed to fetch public services, falling back to constants', error);
        const cached = cacheRepository.get<Service[]>('public_services');
        if (!cached) {
          setServices(fallbackServices as any[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading };
};
