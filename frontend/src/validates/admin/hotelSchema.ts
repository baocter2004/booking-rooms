import { z } from 'zod';

export const hotelSchema = z.object({
  name: z.string().min(2, 'Hotel name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export type HotelFormData = z.infer<typeof hotelSchema>;

