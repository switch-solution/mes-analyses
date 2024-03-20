"use server";
import { prisma } from '@/lib/prisma';
import * as z from "zod"
import { StandardComposantSchema, StandardComposantEditSchema } from '@/src/helpers/definition';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createLog } from '@/src/query/logger.query';
import type { Logger } from '@/src/helpers/type';
import { generateSlug } from "@/src/helpers/generateSlug";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { getStdComponentBySlug } from "@/src/query/software_component.query";
import { getClientBySlug } from '@/src/query/client.query';
import { getSoftwareBySlug } from '@/src/query/software.query';

export const editComponent = authentificationActionUserIsEditorClient(StandardComposantEditSchema, async (values: z.infer<typeof StandardComposantEditSchema>, { clientId, userId }) => {

    const { label, description, status, clientSlug, componentSlug } = StandardComposantEditSchema.parse(values)
    try {
        const client = await getClientBySlug(clientSlug)
        const stdComponent = await getStdComponentBySlug(componentSlug)
        if (!stdComponent) {
            const log: Logger = {
                level: "error",
                message: `Le composant ${componentSlug} n'existe pas mais on a essayé de le modifier.`,
                scope: "standardComponent",
                clientId: clientId
            }
            await createLog(log)
            throw new ActionError("Vous n'êtes pas autorisé à modifier ce composant.")
        }
        const component = await prisma.software_Component.update({
            where: {
                label_softwareLabel_clientId_type: {
                    label: stdComponent.label,
                    softwareLabel: stdComponent.softwareLabel,
                    clientId: client.siren,
                    type: stdComponent.type

                }
            },
            data: {
                label,
                description,
                status,
                version: stdComponent.version + 1
            }
        })
        const log: Logger = {
            level: "error",
            message: `Le composant ${componentSlug} a été modifié.`,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)

    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création du composant.")
    }
    revalidatePath(`/client/${clientSlug}/editor/component`);
    redirect(`/client/${clientSlug}/editor/component`);

})



export const createComponent = authentificationActionUserIsEditorClient(StandardComposantSchema, async (values: z.infer<typeof StandardComposantSchema>, { clientId, userId }) => {

    const { label, description, status, softwareSlug, type, clientSlug } = StandardComposantSchema.parse(values)
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) throw new ActionError("Le logiciel n'existe pas.")
    try {
        const slug = await generateSlug(`${clientId}-${softwareExist.label}-${label}`)
        const component = await prisma.software_Component.create({
            data: {
                label,
                description,
                status,
                type,
                createdBy: userId,
                softwareLabel: softwareExist.label,
                clientId,
                version: 1,
                slug,
                isForm: type === "form" ? true : false,
                isTextArea: type === "textarea" ? true : false,
                isImage: type === "image" ? true : false
            }
        })
        const log: Logger = {
            level: "info",
            message: `Le composant ${component.label} a été créé.`,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    const stdComponent = await prisma.software_Component.findFirstOrThrow({
        where: {
            label: label,
            softwareLabel: softwareExist.label,
            clientId: clientId,
            type: type,
            isForm: type === "form" ? true : false,
            isTextArea: type === "textarea" ? true : false,
            isImage: type === "image" ? true : false
        }
    })
    switch (type) {
        case "form":
            revalidatePath(`/client/${clientSlug}/editor/component/${stdComponent.slug}/form`);
            redirect(`/client/${clientSlug}/editor/component/${stdComponent.slug}/form`);
            break
        case "textarea":
            revalidatePath(`/client/${clientSlug}/editor/component/${stdComponent.slug}/textarea`);
            redirect(`/client/${clientSlug}/editor/component/${stdComponent.slug}/textarea`);
            break
        case "image":
            revalidatePath(`/client/${clientSlug}/editor/component/${stdComponent.slug}/image/upload`);
            redirect(`/client/${clientSlug}/editor/component/${stdComponent.slug}/image/upload`);
            break
        default:
            throw new ActionError("Le type n'est pas reconnu.")
    }


})