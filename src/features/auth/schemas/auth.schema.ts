import { z } from 'zod';

// User Signup Schema
export const userSignupSchema = z.object({
  idNumber: z
    .string()
    .regex(/^\d{8}$/, { message: 'ID number must be an 8-digit number (e.g., 80100016)' })
    .optional()
    .refine((val) => val !== undefined, { message: 'ID number is required for students' })
    .or(z.undefined()),
  name: z.string().min(1, { message: 'Name is required' }).trim(),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['Student', 'Teacher', 'Admin'], { message: 'Role must be Student, Teacher, or Admin' }),
}).refine(
  (data) => (data.role === 'Student' ? data.idNumber !== undefined : data.idNumber === undefined),
  { message: 'ID number is required for Students, but not for Teachers or Admins', path: ['idNumber'] }
);

// User Login Schema
export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;