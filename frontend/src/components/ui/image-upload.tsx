import { useState, useRef } from 'react';
import { Button } from './button';
import { Upload, X, Loader2 } from 'lucide-react';
import { axiosPost } from '@/libs/axios';
import { toast } from 'sonner';
import { getImageUrl } from '@/utils/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: 'hotels' | 'users' | 'rooms' | 'services' | 'posts';
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = 'hotels',
  disabled = false,
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const response = await axiosPost('/admin/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success && response.data?.url) {
        onChange(response.data.url);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      if (onRemove) {
        onRemove();
      } else {
        onChange('');
      }
      toast.success('Image removed');
    } catch (error: any) {
      console.error('Remove error:', error);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {value && (
        <div className="relative inline-block">
          <img src={getImageUrl(value)} alt="Uploaded" className="w-full h-48 object-cover rounded-lg border" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={disabled || uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {value ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </Button>
        {!value && <span className="text-sm text-muted-foreground">Max size: 5MB. Supported: JPG, PNG, GIF, WebP</span>}
      </div>
    </div>
  );
}
