import { ImageMetadata } from '../../types';

interface UploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
}

export const uploadToCloudinary = async (
  file: File,
  folder: 'gallery' | 'barbers' | 'services' | 'offers' | 'banners' | 'reviews',
  onProgress?: (progress: number) => void
): Promise<ImageMetadata> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing');
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', `saiscissors/${folder}`); // Organize by feature

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response: UploadResponse = JSON.parse(xhr.responseText);
        
        // Generate an immediate optimized thumbnail URL
        const parts = response.secure_url.split('/upload/');
        const thumbnailUrl = `${parts[0]}/upload/c_fill,h_200,w_200,q_auto,f_auto/${parts[1]}`;

        resolve({
          publicId: response.public_id,
          imageUrl: response.secure_url,
          thumbnailUrl: thumbnailUrl,
          folder: folder,
          width: response.width,
          height: response.height,
          size: response.bytes,
          createdAt: new Date().toISOString(),
        });
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    
    xhr.open('POST', url, true);
    xhr.send(formData);
  });
};
