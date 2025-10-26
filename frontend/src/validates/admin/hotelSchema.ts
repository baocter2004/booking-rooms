import { z } from 'zod';

export const hotelSchema = z.object({
  name: z
    .string()
    .min(1, 'Hotel name is required')
    .min(2, 'Hotel name must be at least 2 characters'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(5, 'Address must be at least 5 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export type HotelFormData = z.infer<typeof hotelSchema>;

export const hotelFilterSchema = z
  .object({
    search: z.string().optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email('Invalid email address').or(z.literal('')).optional(),
    phone: z.string().optional(),
    from_date: z.string().optional(),
    to_date: z.string().optional(),
    sort: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.from_date && data.to_date) {
        const fromDate = new Date(data.from_date);
        const toDate = new Date(data.to_date);
        return fromDate <= toDate;
      }
      return true;
    },
    {
      message: 'From Date cannot be later than To Date',
      path: ['from_date'],
    }
  );

export type HotelFilterData = z.infer<typeof hotelFilterSchema>;

