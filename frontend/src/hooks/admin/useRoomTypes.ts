import { buildQueryParams, type RoomTypeFilters } from '@/constants/filters';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/libs/axios';
import type { RoomType, RoomTypeFormData } from '@/types/room-types';
import {
  API_ADMIN_ROOM_TYPES,
  API_ADMIN_ROOM_TYPES_DELETE,
  API_ADMIN_ROOM_TYPES_SHOW,
  API_ADMIN_ROOM_TYPES_UPDATE,
} from '@/utils/constants/api-url';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface UseRoomTypesReturn {
  roomTypes: RoomType[];
  roomType: RoomType | null;
  loading: boolean;
  pagination: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
  fetchRoomTypes: (filters?: RoomTypeFilters) => Promise<void>;
  fetchRoomType: (id: number) => Promise<void>;
  createRoomType: (data: RoomTypeFormData) => Promise<boolean>;
  updateRoomType: (id: number, data: RoomTypeFormData) => Promise<boolean>;
  deleteRoomType: (id: number) => Promise<boolean>;
}

export const useRoomTypes = (): UseRoomTypesReturn => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomType, setRoomType] = useState<RoomType>();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });

  const fetchRoomTypes = useCallback(async (filter?: RoomTypeFilters) => {
    try {
      setLoading(true);
      const params = filter ? buildQueryParams(filter) : {};
      const response = await axiosGet(API_ADMIN_ROOM_TYPES, { params });

      if (response.data) {
        setRoomTypes(response.data || []);
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
      toast.error('Failed to fetch room types', {
        description: error.message || 'An error occurred',
      });
      setRoomTypes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoomType = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosGet(API_ADMIN_ROOM_TYPES_SHOW(id));
      if (response.data) {
        setRoomType(response.data);
      } else {
        setRoomType(null);
      }
    } catch (error: any) {
      toast.error('Failed to fetch room types', {
        description: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoomType = useCallback(async (data: RoomTypeFormData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosPost(API_ADMIN_ROOM_TYPES, data);
      if (response.success) {
        toast.success('Room Type created successfully');
        return true;
      } else {
        const errorMessage = response.errors
          ? Object.values(response.errors).flat().join(', ')
          : response.message || 'An error occurred';

        toast.error('Failed to create Room Type', {
          description: errorMessage,
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to create Room Type', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRoomType = useCallback(async (id: number, data: RoomTypeFormData): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosPut(API_ADMIN_ROOM_TYPES_UPDATE(id), data);

      if (response.success) {
        toast.success('Room Type updated successfully');
        return true;
      } else {
        const errorMessage = response.errors
          ? Object.values(response.errors).flat().join(', ')
          : response.message || 'An error occurred';

        toast.error('Failed to update Room Type', {
          description: errorMessage,
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to update Room Type', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRoomType = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await axiosDelete(API_ADMIN_ROOM_TYPES_DELETE(id));

      if (response.success) {
        toast.success('Room Type deleted successfully');
        return true;
      } else {
        toast.error('Failed to delete Room Type', {
          description: response.message || 'An error occurred',
        });
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to delete Room Type', {
        description: error.message || 'An error occurred',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    roomTypes,
    roomType,
    loading,
    pagination,
    fetchRoomTypes,
    fetchRoomType,
    createRoomType,
    updateRoomType,
    deleteRoomType,
  };
};
