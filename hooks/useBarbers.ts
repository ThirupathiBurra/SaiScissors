import { useState, useEffect } from 'react';
import { Barber } from '../types';
import { barberRepository } from '../repositories/barberRepository';

const DEMO_BARBERS: Barber[] = [
  {
    id: 'demo-barber-1',
    name: 'Ravi Kumar',
    expertise: ['Classic Haircut', 'Fade Cut', 'Skin Fade', 'Design Cuts', 'Beard Art'],
    rating: 4.8,
    reviewCount: 124,
    active: true,
    status: 'AVAILABLE',
    order: 1,
    workingHours: '8:00 AM - 9:00 PM',
    weeklyOff: 'Tuesday',
  },
  {
    id: 'demo-barber-2',
    name: 'Mahesh Naik',
    expertise: ['Hair Spa', 'Facial', 'Head Massage', 'Hair Coloring', 'Classic Haircut'],
    rating: 4.6,
    reviewCount: 87,
    active: true,
    status: 'BUSY',
    order: 2,
    workingHours: '9:00 AM - 9:00 PM',
    weeklyOff: 'Wednesday',
  },
  {
    id: 'demo-barber-3',
    name: 'Ajay Sharma',
    expertise: ['Beard Styling', 'Classic Haircut', 'Razor Shave', 'Hair Wash', 'Premium Grooming'],
    rating: 4.5,
    reviewCount: 63,
    active: true,
    status: 'AVAILABLE',
    order: 3,
    workingHours: '10:00 AM - 8:00 PM',
    weeklyOff: 'Monday',
  },
];

export const useBarbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = barberRepository.subscribeToBarbers((data) => {
      setBarbers(data.length > 0 ? data : DEMO_BARBERS);
      setLoading(false);
    });

    const fallbackTimer = setTimeout(() => {
      setBarbers(prev => prev.length === 0 ? DEMO_BARBERS : prev);
      setLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const createBarber = async (barber: Omit<Barber, 'id'>) => {
    await barberRepository.createBarber(barber);
  };

  const updateBarber = async (id: string, barber: Partial<Barber>) => {
    await barberRepository.updateBarber(id, barber);
  };

  const deleteBarber = async (id: string) => {
    await barberRepository.deleteBarber(id);
  };

  return {
    barbers,
    loading,
    createBarber,
    updateBarber,
    deleteBarber,
  };
};
