'use server';
import { put } from '@vercel/blob';
import { zfd } from "zod-form-data";
import { z } from "zod";
import { Project } from '@/src/classes/project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Security } from '@/src/classes/security';
import { prisma } from "@/lib/prisma"
const uploadFileSchema = zfd.formData({
    clientSlug: zfd.text(z.string({ required_error: 'clientSlug est obligatoire' })),
    projectSlug: zfd.text(z.string({ required_error: 'projectSlug est obligatoire' })),
    label: zfd.text(z.string()),
    file: zfd.file(),
});
export async function uploadFile(formData: FormData) {
    const allowedContentTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const security = new Security()
    const session = await security.session()
    if (!session?.user.id) {
        throw new Error('Vous devez être connecté pour effectuer cette action')
    }
    const rawFormData = {
        clientSlug: formData.get('clientSlug'),
        projectSlug: formData.get('projectSlug'),
        label: formData.get('label'),
        file: formData.get('file') as File,
    };
    if (rawFormData.file && rawFormData.label && rawFormData.clientSlug && rawFormData.projectSlug) {
        const project = new Project(rawFormData.projectSlug as string)
        const projectExist = await project.projectExist()
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const projectDetail = await project.projectDetails()
        const userIsAuthorized = await security.isAuthorizedInThisProject(projectExist.slug)
        if (!userIsAuthorized) {
            throw new Error('Vous n\'êtes pas autorisé à effectuer cette action')
        }

        const contentType = rawFormData.file.type
        if (!allowedContentTypes.includes(contentType)) {
            throw new Error('Le type de fichier n\'est pas autorisé')
        }

        const blob = await put(rawFormData.label as string, rawFormData.file as File, {
            access: 'public',
        });
        await prisma.project_Attachment.create({
            data: {
                clientId: projectDetail.clientId,
                projectLabel: projectDetail.label,
                softwareLabel: projectDetail.softwareLabel,
                url: blob.url,
                pathname: blob.pathname,
                downloadUrl: blob.downloadUrl,
                contentType: blob.contentType,
                contentDisposition: blob.contentDisposition,
                createdBy: session.user.id,
            }

        })
    }


    revalidatePath(`/client/${rawFormData.clientSlug}/project/${rawFormData.projectSlug}/file`);
    redirect(`/client/${rawFormData.clientSlug}/project/${rawFormData.projectSlug}/file`);
}
