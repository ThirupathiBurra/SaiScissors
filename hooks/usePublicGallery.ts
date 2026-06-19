import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { GalleryItem } from '../types';
import { cacheRepository } from '../repositories/cacheRepository';
import { GALLERY_ITEMS as fallbackGallery } from '../lib/constants';

export const usePublicGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const cached = cacheRepository.get<GalleryItem[]>('public_gallery');
        if (cached) {
          setItems(cached);
        }

        const q = query(
          collection(db, COLLECTIONS.GALLERY), 
          where('active', '==', true),
          orderBy('order', 'asc')
        );
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const freshData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
          setItems(freshData);
          cacheRepository.set('public_gallery', freshData);
        } else if (!cached) {
          // Fallback map
          const mappedFallback: GalleryItem[] = fallbackGallery.map((img, i) => ({
            id: `fallback-${i}`,
            imageUrl: (img as any).imageUrl || '',
            caption: img.caption,
            category: img.caption,
            order: i,
            active: true
          }));
          setItems(mappedFallback);
        }
      } catch (error) {
        console.error('Failed to fetch public gallery, falling back', error);
        const cached = cacheRepository.get<GalleryItem[]>('public_gallery');
        if (!cached) {
          const mappedFallback: GalleryItem[] = fallbackGallery.map((img, i) => ({
            id: `fallback-${i}`,
            imageUrl: (img as any).imageUrl || '',
            caption: img.caption,
            category: img.caption,
            order: i,
            active: true
          }));
          setItems(mappedFallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return { items, loading };
};
