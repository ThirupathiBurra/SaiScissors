export type BarberStatus = 'AVAILABLE' | 'BUSY' | 'OFF';

export interface Barber {
  id?: string;
  name: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  active: boolean;
  status: BarberStatus;
  order: number;
  workingHours?: string;
  weeklyOff?: string;
}
