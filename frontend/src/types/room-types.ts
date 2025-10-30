export interface RoomType {
  id: number;
  name: string;
  description?: string;
}

export interface RoomTypeFormData {
  name: string;
  display_name: string;
  description?: string;
  capacity?: number;
  base_price?: string;
}

export interface RoomTypeListResponse {
  success: boolean;
  message: string;
  data: {
    data: RoomType[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface RoomTypeResponse {
  success: boolean;
  message: string;
  data: RoomType;
}
