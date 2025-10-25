import { useState, useCallback } from 'react';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from '@/libs/axios';
import {
  API_ADMIN_HOTELS,
  API_ADMIN_HOTELS_SHOW,
  API_ADMIN_HOTELS_UPDATE,
  API_ADMIN_HOTELS_DELETE,
} from '@/utils/constants/api-url';
import type { Hotel, HotelFormData } from '@/types/hotel';
import { toast } from 'sonner';

interface UseHotelsReturn {
  hotels: Hotel[];
  hotel: Hotel | null;
  loading: boolean;
  pagination: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
  fetchHotels: (params?: Record<string, any>) => Promise<void>;
  fetchHotel: (id: number) => Promise<void>;
  createHotel: (data: HotelFormData) => Promise<boolean>;
  updateHotel: (id: number, data: HotelFormData) => Promise<boolean>;
  deleteHotel: (id: number) => Promise<boolean>;
}

export const useHotels = (): UseHotelsReturn => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });

  const fetchHotels = useCallback(async (params?: Record<string, any>) => {
    try {
      setLoading(true);
      const response = await axiosGet(API_ADMIN_HOTELS, { params });

      if (response.data) {
        setHotels(response.data || []);
        if (response.meta) {
          setPagination({
            currentPage: response.meta.current_page || 1,
            perPage: response.meta.per_page || 10,
            total: response.meta.total || 0,
            lastPage: response.meta.last_page || 1,
          });
        }
      }
    } catch (error: any) {
      toast.error('Failed to fetch hotels', {
        description: error.message || 'An error occurred',
      });
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHotel = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosGet(API_ADMIN_HOTELS_SHOW(id));

      if (response.data) {
        setHotel(response.data);
      } else {
        setHotel(null);
      }
    } catch (error: any) {
      toast.error('Failed to fetch hotel', {
        description: error.message || 'An error occurred',
      });
      setHotel(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createHotel = useCallback(async (data: HotelFormData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosPost(API_ADMIN_HOTELS, data);

      if (response.success) {
        toast.success('Hotel created successfully');
        return true;
      } else {
        toast.error('Failed to create hotel', {
          description: response.message || 'An error occurred',
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to create hotel', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateHotel = useCallback(async (id: number, data: HotelFormData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosPut(API_ADMIN_HOTELS_UPDATE(id), data);

      if (response.success) {
        toast.success('Hotel updated successfully');
        return true;
      } else {
        toast.error('Failed to update hotel', {
          description: response.message || 'An error occurred',
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to update hotel', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHotel = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosDelete(API_ADMIN_HOTELS_DELETE(id));

      if (response.success) {
        toast.success('Hotel deleted successfully');
        return true;
      } else {
        toast.error('Failed to delete hotel', {
          description: response.message || 'An error occurred',
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to delete hotel', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    hotels,
    hotel,
    loading,
    pagination,
    fetchHotels,
    fetchHotel,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};
