import { ImageMetadata } from './media';

export interface Offer {
  id?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageMeta?: ImageMetadata;
  discountLabel: string;
  active: boolean;
  priority: number;
  startDate?: Date | string;
  expiryDate?: Date | string;
  displayOrder: number;
}
