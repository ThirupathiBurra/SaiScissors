export interface Review {
  id?: string;
  customerName: string;
  rating: number;
  text: string;
  createdAt: Date | string;
  isVerified: boolean;
  active: boolean;
}
