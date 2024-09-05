'use server';

import { z as zod } from 'zod';
import { PROFILE_IMAGE_FILE_TYPES, PROFILE_IMAGE_MAX_FILE_SIZE } from '../constants';


const registerDataSchema = zod.object({
  name: zod.string().min(1, 'Name is required').max(100),
  email: zod.string().min(1, 'Email is required').email('Invalid email'),
  password: zod.string().min(1, 'Password is required').min(6, 'Password must have 6 characters'),
  confirmPassword: zod.string().min(1, 'Password confirmation is required'),
  company: zod.string().optional(),
  industry: zod.string().optional(),
  role: zod.string().optional(),
  imageUrl: zod
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size < PROFILE_IMAGE_MAX_FILE_SIZE, 'File size must be less than 3Mb')
    .refine(file => file && file.size === 0 || file && PROFILE_IMAGE_FILE_TYPES.includes(file?.type), 'The image must have one of the following formats: JPEG, PNG, SVG')
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    
  } catch (error: any) {
    
  }
};

export const register = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const imageUrl = formData.get('imageUrl');
  const company = formData.get('company');
  const industry = formData.get('industry');
  const role = formData.get('role');

  try {
    console.log('REGISTER', {
      name,
      email,
      password,
      confirmPassword,
      imageUrl,
      company,
      industry,
      role,
    });
    
    const validatedFields = registerDataSchema.safeParse({
      name, email, password, confirmPassword, imageUrl, company, industry, role
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    };

    console.log('FORM DATA CHECKED')
  } catch (error: any) {
    console.log('REGISTER', error);
  }
};