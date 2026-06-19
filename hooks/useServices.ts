import { useState, useEffect } from 'react';
import { Service } from '../types';
import { serviceRepository } from '../repositories/serviceRepository';

const DEMO_SERVICES: Service[] = [
  {
    id: 'demo-svc-1',
    name: 'Classic Haircut',
    description: 'Precision scissor cut tailored to your face shape. Clean, sharp, and timeless. Includes wash and style finish.',
    price: 80,
    durationMinutes: 30,
    category: 'haircut',
    active: true,
    isPopular: true,
    order: 1,
  },
  {
    id: 'demo-svc-2',
    name: 'Fade Cut',
    description: 'Modern fade with smooth gradient from skin to full length. High fade, mid fade, or low fade — your choice.',
    price: 120,
    durationMinutes: 40,
    category: 'haircut',
    active: true,
    isPopular: true,
    order: 2,
  },
  {
    id: 'demo-svc-3',
    name: 'Beard Styling',
    description: 'Sculpted beard shaping with razor edge detailing. Includes hot towel, beard oil, and clean neckline finish.',
    price: 50,
    durationMinutes: 20,
    category: 'beard',
    active: true,
    isPopular: false,
    order: 3,
  },
  {
    id: 'demo-svc-4',
    name: 'Hair Spa',
    description: 'Deep nourishing treatment to restore strength, shine, and scalp health. Includes steam and protein mask.',
    price: 350,
    durationMinutes: 45,
    category: 'spa',
    active: true,
    isPopular: false,
    order: 4,
  },
  {
    id: 'demo-svc-5',
    name: 'Facial Treatment',
    description: 'Premium skin care ritual for a refreshed, glowing complexion. Deep cleanse, exfoliation, and moisturizing mask.',
    price: 200,
    durationMinutes: 40,
    category: 'facial',
    active: true,
    isPopular: false,
    order: 5,
  },
  {
    id: 'demo-svc-6',
    name: 'Premium Grooming',
    description: 'The complete Saiscissors experience. Haircut + Beard + Facial + Head Massage — the ultimate grooming session.',
    price: 499,
    durationMinutes: 90,
    category: 'combo',
    active: true,
    isPopular: true,
    order: 6,
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = serviceRepository.subscribeToServices((data) => {
      setServices(data.length > 0 ? data : DEMO_SERVICES);
      setLoading(false);
    });

    const fallbackTimer = setTimeout(() => {
      setServices(prev => prev.length === 0 ? DEMO_SERVICES : prev);
      setLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const createService = async (service: Omit<Service, 'id'>) => {
    await serviceRepository.createService(service);
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    await serviceRepository.updateService(id, service);
  };

  const deleteService = async (id: string) => {
    await serviceRepository.softDeleteService(id);
  };

  return {
    services,
    loading,
    createService,
    updateService,
    deleteService,
  };
};
