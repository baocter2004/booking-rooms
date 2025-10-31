// Admin API endpoints
export const API_ADMIN_LOGIN = '/admin/login';
export const API_ADMIN_LOGOUT = '/admin/logout';
export const API_ADMIN_PROFILE = '/admin/profile';

// Upload
export const API_ADMIN_UPLOAD_IMAGE = '/admin/upload/image';
export const API_ADMIN_DELETE_IMAGE = '/admin/upload/delete';

// Admin - Hotels
export const API_ADMIN_HOTELS = '/admin/hotels';
export const API_ADMIN_HOTELS_SHOW = (id: number) => `/admin/hotels/${id}`;
export const API_ADMIN_HOTELS_CREATE = '/admin/hotels';
export const API_ADMIN_HOTELS_UPDATE = (id: number) => `/admin/hotels/${id}`;
export const API_ADMIN_HOTELS_DELETE = (id: number) => `/admin/hotels/${id}`;

// Admin - Room types
export const API_ADMIN_ROOM_TYPES = '/admin/room-types';
export const API_ADMIN_ROOM_TYPES_SHOW = (id: number) => `/admin/room-types/${id}`;
export const API_ADMIN_ROOM_TYPES_CREATE = '/admin/room-types';
export const API_ADMIN_ROOM_TYPES_UPDATE = (id: number) => `/admin/room-types/${id}`;
export const API_ADMIN_ROOM_TYPES_DELETE = (id: number) => `/admin/room-types/${id}`;
// Admin - Rooms
export const API_ADMIN_ROOMS = '/admin/rooms';
export const API_ADMIN_ROOMS_SHOW = (id: number) => `/admin/rooms/${id}`;

// Admin - Users
export const API_ADMIN_USERS = '/admin/users';
export const API_ADMIN_USERS_SHOW = (id: number) => `/admin/users/${id}`;

// Admin - Staff
export const API_ADMIN_STAFF = '/admin/staffs';
export const API_ADMIN_STAFF_SHOW = (id: number) => `/admin/staffs/${id}`;

// Admin - Services
export const API_ADMIN_SERVICES = '/admin/services';
export const API_ADMIN_SERVICE_TYPES = '/admin/service-types';

// Staff API endpoints
export const API_STAFF_LOGIN = '/staff/login';
export const API_STAFF_LOGOUT = '/staff/logout';
export const API_STAFF_PROFILE = '/staff/profile';

// User API endpoints
export const API_USER_LOGIN = '/user/login';
export const API_USER_LOGOUT = '/user/logout';
export const API_USER_PROFILE = '/user/profile';
export const API_USER_REGISTER = '/user/register';
