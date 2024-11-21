import supabase from "../lib/supabase-client";

export const uploadImage = async (file: any): Promise<string> => {
  if (!file) {
    throw new Error('No file uploaded.');
  }

  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(`${Date.now()}_${file.originalname}`, file.buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.mimetype,
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  const imageUrl = `${process.env.SUPABASE_PROJECT_URL}/storage/v1/object/public/images/${data.path}`;

  // await prisma.user.update({
  //   where: { id: parseInt(userId, 10) },
  //   data: { imageUrl },
  // });

  return imageUrl;
};