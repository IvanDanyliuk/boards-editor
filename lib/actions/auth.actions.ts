'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z as zod } from 'zod';
import { createServerClient } from '../db/clients/server';
import { PROFILE_IMAGE_FILE_TYPES, PROFILE_IMAGE_MAX_FILE_SIZE } from '../constants';


const loginDataSchema = zod.object({
  email: zod.string().min(1, 'Email is required').email('Invalid email'),
  password: zod.string().min(1, 'Password is required').min(6, 'Password must have 6 characters'),
});

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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = loginDataSchema.safeParse({
    email, password
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  };

  const supabase = createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      error: {
        credentials: [error?.message!],
      },
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const register = async (prevState: any, formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const imageUrl = formData.get('imageUrl');
  const company = formData.get('company') as string;
  const industry = formData.get('industry') as string;
  const role = formData.get('role') as string;

  const validatedFields = registerDataSchema.safeParse({
    name, email, password, confirmPassword, imageUrl, company, industry, role
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  };

  const supabase = createServerClient();

  const { error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
    options: {
      data: {
        id: crypto.randomUUID(),
        name,
        imageUrl: 'https://kevinsharuk.wordpress.com/wp-content/uploads/2013/05/mrbean.jpg',
        company,
        industry,
        role,
        createdAt: new Date().toISOString()
      }
    }
  });

  if (error) {
    return {
      error: {
        register: [error.message],
      },
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const logout = async () => {
  const supabase = createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: {
        logout: [error.message],
      },
    };
  }

  revalidatePath('/login', 'layout');
  redirect('/login');
};

export const getCurrentUser = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();
  return {
    data, error
  };
};