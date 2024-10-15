import { createServerClient } from "../clients/server";

type UploadImageProps = {
  file: File;
  bucket: string;
  folder?: string;
}

type RemoveImageProps = {
  imagePath: string;
  bucket: string;
}


export async function uploadImage({ file, bucket, folder }: UploadImageProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? folder + '/' : ''}${crypto.randomUUID()}.${fileExtension}`;

  const { storage } = createServerClient();
  const { data, error } = await storage.from(bucket).upload(path, file);

  if(error) {
    return {
      imageUrl: '',
      message: 'Image upload failed',
    };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path}`;
  return {
    imageUrl,
    message: null,
  }
};

export async function removeImage({ imagePath, bucket }: RemoveImageProps) {
  const { storage } = createServerClient();
  const { error } = await storage.from(bucket).remove([imagePath]);

  if(error) {
    return {
      imageUrl: '',
      message: 'Failed to remove an image',
    };
  }

  return {
    message: null
  }
}