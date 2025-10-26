export interface RoomType {
  id: number;
  name: string;
  description?: string;
}

export interface RoomImage {
  id: number;
  room_id: number;
  image_url: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Room {
  id: number;
  number: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  status: boolean;
  hotel_id: number;
  room_type_id: number;
  room_type?: RoomType;
  images?: RoomImage[];
  created_at?: string;
  updated_at?: string;
}

export interface HotelImage {
  id: number;
  hotel_id: number;
  image_url: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  image_url?: string;
  images?: HotelImage[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  rooms_count?: number;
  staff_count?: number;
  services_count?: number;
  bookings_count?: number;
  rooms_paginated?: {
    data: Room[];
    meta: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
  staff_paginated?: {
    data: any[];
    meta: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
}

export interface HotelFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  image_url?: string;
  images?: string[];
  rooms?: Array<{
    id?: string;
    name: string;
    number: string;
    price: number;
    description: string;
    image_url: string;
    images?: string[];
    room_type_id: number;
    status?: number;
  }>;
  services?: Array<{
    id?: string;
    name: string;
    price: number;
    duration: number;
    description: string;
    image_url: string;
    service_type_id: number;
  }>;
}

export interface RoomFormData {
  id?: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  images?: string[];
}

export interface ServiceFormData {
  id?: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  image_url: string;
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

