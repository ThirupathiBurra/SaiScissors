import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { Review } from '../types';
import { cacheRepository } from '../repositories/cacheRepository';
import { TESTIMONIALS as fallbackReviews } from '../lib/constants';

export const usePublicReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const cached = cacheRepository.get<Review[]>('public_reviews');
        if (cached) {
          setReviews(cached);
        }

        const q = query(
          collection(db, COLLECTIONS.REVIEWS), 
          where('active', '==', true),
          where('isVerified', '==', true), // Only public verified
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const freshData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
          setReviews(freshData);
          cacheRepository.set('public_reviews', freshData);
        } else if (!cached) {
          const mappedFallback: Review[] = fallbackReviews.map((rev, i) => ({
            id: `fallback-${i}`,
            customerName: rev.name,
            rating: rev.rating,
            text: rev.review,
            createdAt: new Date().toISOString(),
            isVerified: true,
            active: true
          }));
          setReviews(mappedFallback);
        }
      } catch (error) {
        console.error('Failed to fetch public reviews, falling back', error);
        const cached = cacheRepository.get<Review[]>('public_reviews');
        if (!cached) {
          const mappedFallback: Review[] = fallbackReviews.map((rev, i) => ({
            id: `fallback-${i}`,
            customerName: rev.name,
            rating: rev.rating,
            text: rev.review,
            createdAt: new Date().toISOString(),
            isVerified: true,
            active: true
          }));
          setReviews(mappedFallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading };
};
