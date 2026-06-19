'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/upload/cloudinaryUpload';
import { ImageMetadata } from '@/types';
import Image from 'next/image';

interface ImageUploaderProps {
  folder: 'gallery' | 'barbers' | 'services' | 'offers' | 'banners' | 'reviews';
  onUploadSuccess: (metadata: ImageMetadata) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUploader({ folder, onUploadSuccess, currentImage, className = '' }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, WebP)');
      return;
    }

    // Rough client-side check (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      // Temporary local preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const metadata = await uploadToCloudinary(file, folder, (p) => setProgress(p));
      
      // Update with final Cloudinary URL
      setPreview(metadata.imageUrl);
      onUploadSuccess(metadata);
      
      // Cleanup local preview
      URL.revokeObjectURL(objectUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) processFile(files[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) processFile(files[0]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id={`upload-${folder}`}
        disabled={isUploading}
      />
      
      <label
        htmlFor={`upload-${folder}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden relative
          ${isDragging ? 'border-[#C9A84C] bg-[rgba(201,168,76,0.05)]' : 'border-[#333] hover:border-[#555] hover:bg-[#161616]'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        {preview && !isUploading ? (
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className="object-cover opacity-80"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <UploadCloud size={16} /> Replace Image
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center z-10">
            {isUploading ? (
              <>
                <Loader2 size={32} className="text-[#C9A84C] animate-spin mb-3" />
                <p className="text-sm font-medium text-white mb-2">Uploading...</p>
                <div className="w-48 h-2 bg-[#222] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">{progress}%</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3 text-[#9CA3AF]">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm font-medium text-white mb-1">
                  <span className="text-[#C9A84C]">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-[#6B7280]">SVG, PNG, JPG or WebP (max. 5MB)</p>
              </>
            )}
          </div>
        )}
      </label>
      
      {error && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}
