"use server";
import { prisma } from "@/lib/prisma";
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
export const uploadFile = async (projectId: string, formData: FormData) => {
    const imageFile = formData.get('pdf') as File;
    const blob = await put(imageFile.name, imageFile, {
        access: 'public',
    });
    revalidatePath('/');
    return blob;
}