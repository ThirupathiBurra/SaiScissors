import { ImageMetadata } from './media';

export interface Banner {
  id?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageMeta?: ImageMetadata;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  priority: number;
}
