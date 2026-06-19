export interface ImageMetadata {
  publicId: string;
  imageUrl: string;
  thumbnailUrl: string;
  folder: string;
  width: number;
  height: number;
  size: number;
  createdAt: Date | string;
}
