/**
 * Get full image URL from backend
 * @param path - Relative path from backend (e.g., "/storage/hotels/image.jpg")
 * @returns Full URL to the image
 */
export function getImageUrl(path?: string | null): string {
  if (!path) return '';
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
        
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const baseUrl = apiUrl.replace('/api', '');
  
  const imagePath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${imagePath}`;
}

