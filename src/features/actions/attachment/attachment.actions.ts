"use server";
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
export const uploadFile = async (formData: FormData) => {
    console.log(formData)
    const imageFile = formData.get('KBIS') as File;
    const blob = await put(imageFile.name, imageFile, {
        access: 'public',
    });
    revalidatePath('/');
    return blob;
}