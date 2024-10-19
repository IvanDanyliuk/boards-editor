'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { createServerClient } from '../db/clients/server';
import { removeImage, uploadImage } from '../db/storage/client';
import { PROFILE_IMAGE_FILE_TYPES, PROFILE_IMAGE_MAX_FILE_SIZE } from '../constants';


const userDataSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  company: zod.string().min(1, 'Company is required'),
  industry: zod.string().min(1, 'Industry is required'),
  role: zod.string().min(1, 'Role is required'),
});

const updateProfilePhotoSchema = zod.object({
  profileImage: zod
  .instanceof(File)
  .optional()
  .refine(file => !file || file.size !== 0 || file.size < PROFILE_IMAGE_MAX_FILE_SIZE, 'File size must be less than 3Mb')
  .refine(file => !file || file.type === '' || PROFILE_IMAGE_FILE_TYPES.includes(file.type), 'The image must have one of the following formats: JPEG, PNG, SVG')
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

export const updateProfilePhoto = async (prevState: any, formData: FormData) => {
  const newProfileImage = formData.get('profileImage') as any;

  const validatedFields = updateProfilePhotoSchema.safeParse({
    profileImage: newProfileImage
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  };

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();
  const currentProfilePhotoUrl = currentUser.data.user ? currentUser.data.user?.user_metadata.imageUrl : '';

  const { imageUrl, message } = await uploadImage({
    file: newProfileImage,
    bucket: process.env.SUPABASE_STORAGE_BUCKET!,
  });

  if(message) {
    return {
      error: {
        uploadUserImage: [message]
      }
    }
  }
  
  const { data, error } = await supabase.auth.updateUser({
    data: {
      imageUrl
    }
  });

  if(imageUrl && !error) {
    const { message } = await removeImage({
      imagePath: currentProfilePhotoUrl,
      bucket: process.env.SUPABASE_STORAGE_BUCKET!
    });

    if(message) {
      return {
        error: {
          uploadUserImage: [message],
        },
      };
    }
  }

  if (error) {
    return {
      error: {
        uploadUserImage: [error.message],
      },
    };
  }

  revalidatePath('/', 'layout');
};

export const removeProfilePhoto = async (imagePath: string) => {
  const { message } = await removeImage({
    imagePath,
    bucket: process.env.SUPABASE_STORAGE_BUCKET!
  });

  if(message) {
    return {
      error: {
        uploadUserImage: [message],
      },
    };
  }

  const supabase = createServerClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      imageUrl: ''
    }
  });

  if (error) {
    return {
      error: {
        uploadUserImage: [error.message],
      },
    };
  }

  revalidatePath('/', 'layout');
};

