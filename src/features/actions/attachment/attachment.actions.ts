"use server";
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadDsn } from '@/src/features/actions/dsn/dsn.actions';
import { updateTaskStatusIsCompleted } from '@/src/query/project_task.query'
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";

export const uploadFile = async (name: string, projectSlug: string, clientSlug: string, formData: FormData) => {

    const userIsAuthorized = await userIsAuthorizeInThisProject(projectSlug)
    if (!userIsAuthorized) {
        throw new Error('Vous n\'avez pas les droits pour effectuer cette action')
    }
    if (name === "DSN") {
        await uploadDsn(projectSlug, formData);
    }

    const file = formData.get(name) as File;
    const blob = await put(file.name, file, {
        access: 'public',
    });
    await updateTaskStatusIsCompleted(name, projectSlug);

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/task/`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/task/`);

    return blob;
}