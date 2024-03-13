import { list } from '@vercel/blob';

export async function getVercelBlobFiles() {
    const blobs = await list();
    return blobs;
}