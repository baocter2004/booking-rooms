import { useState, useCallback } from 'react';
import api from '@/libs/axios';
import { toast } from 'sonner';

export interface UseFetchOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, options?: any) => Promise<T | null>;
  reset: () => void;
}

export function useFetch<T = any>(options: UseFetchOptions = {}): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    showToast = true,
    successMessage = 'Operation successful',
    errorMessage = 'Operation failed'
  } = options;

  const execute = useCallback(async (url: string, requestOptions?: any): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api(url, requestOptions);
      
      if (response.data.success) {
        setData(response.data.data);
        
        if (showToast && successMessage) {
          toast.success(successMessage);
        }
        
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Request failed');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || errorMessage;
      setError(errorMsg);
      
      if (showToast) {
        toast.error(errorMessage, {
          description: errorMsg,
        });
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast, successMessage, errorMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
