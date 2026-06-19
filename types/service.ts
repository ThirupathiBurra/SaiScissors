export interface Service {
  id?: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: 'haircut' | 'beard' | 'spa' | 'facial' | 'combo';
  active: boolean;
  imageUrl?: string;
  isPopular?: boolean;
  order: number;
}
