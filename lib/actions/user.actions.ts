'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import db from '../db';
import { createServerClient } from '../db/clients/server';


const userDataSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  company: zod.string().min(1, 'Company is required'),
  industry: zod.string().min(1, 'Industry is required'),
  role: zod.string().min(1, 'Role is required'),
});


export const getCurrentUser = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();

  return {
    data, error
  };
};

export const updateUserData = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const company = formData.get('company');
  const industry = formData.get('industry');
  const role = formData.get('role');

  const validatedFields = userDataSchema.safeParse({
    name, company, industry, role,
  });

  if(!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  };

  const supabase = createServerClient();
  
  const { error } = await supabase.auth.updateUser({
    data: {
      name, 
      company, 
      industry, 
      role,
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
};