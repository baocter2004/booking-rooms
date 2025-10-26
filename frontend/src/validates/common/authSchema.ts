import { z } from 'zod';

// Admin schemas
export const adminLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

// Staff schemas
export const staffLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export type StaffLoginFormData = z.infer<typeof staffLoginSchema>;

// User schemas
export const userLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export const userRegisterSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type UserLoginFormData = z.infer<typeof userLoginSchema>;
export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
