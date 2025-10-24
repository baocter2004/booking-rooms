export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  rooms_count?: number;
  staff_count?: number;
  bookings_count?: number;
}

export interface HotelFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  image_url?: string;
}

export interface HotelListResponse {
  success: boolean;
  message: string;
  data: {
    data: Hotel[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface HotelResponse {
  success: boolean;
  message: string;
  data: Hotel;
}

