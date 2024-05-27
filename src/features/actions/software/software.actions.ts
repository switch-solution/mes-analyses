"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwaresSchema, CreateUserSoftwareSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { DynamicPage } from "@/src/classes/dynamicPage";
import { getClientSirenBySlug } from "@/src/query/client.query";
import { Form } from "@/src/classes/form";
import { authentificationActionUserIsAdminClient, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { Security } from "@/src/classes/security";
import { Software } from "@/src/classes/software";
export const deleteSoftware = async (softwareSlug: string, clientSlug: string) => {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const clientId = await getClientSirenBySlug(clientSlug)
    if (!clientId) throw new Error("Le client n'existe pas.")
    const isAdmin = await security.isAdministratorClient(clientId)
    const software = await prisma.software.findUnique({
        where: {
            clientId,
            slug: softwareSlug
        }
    })
    if (!software) throw new Error("Ce logiciel n'existe pas.")

    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    await prisma.software.delete({
        where: {
            clientId,
            slug: softwareSlug
        }
    })

    revalidatePath(`/client/${software.clientId}/software/`)
    redirect(`/client/${clientId}/software/`)

}

export const editSoftware = authentificationActionUserIsAdminClient(SoftwaresSchema, async (values: z.infer<typeof SoftwaresSchema>, { clientId, userId }) => {

    const { label, slug, clientSlug } = SoftwaresSchema.parse(values)
    const software = await prisma.software.findUniqueOrThrow({
        where: {
            slug: slug
        }
    })

    if (!software) throw new ActionError("Ce logiciel n'existe pas.")
    await prisma.software.update({
        where: {
            slug: slug
        },
        data: {
            label,
            createdBy: userId,
            updatedAt: new Date()
        }
    })



    const log: Logger = {
        level: "info",
        message: `Le logiciel ${software.label} a été édité`,
        scope: "software",
        clientId: software.clientId,
    }
    await createLog(log)

    revalidatePath(`/client/${clientSlug}/administrator/software/`)
    redirect(`/client/${clientSlug}/administrator/software/`)

})

export const createUserSoftware = authentificationActionUserIsAdminClient(CreateUserSoftwareSchema, async (values: z.infer<typeof CreateUserSoftwareSchema>, { clientId, userId }) => {
    const { isEditor, softwareSlug, userInternalId, clientSlug } = CreateUserSoftwareSchema.parse(values)
    try {
        const security = new Security()
        const software = await getSoftwareBySlug(softwareSlug)
        if (!software) throw new ActionError("Ce logiciel n'existe pas.")
        const user = await security.userIsValid()
        if (!user) throw new ActionError("Cet utilisateur n'existe pas.")
        const userExistForSoftware = await prisma.userSoftware.findFirst({
            where: {
                userId: user.id,
                softwareClientId: clientId
            }
        })
        if (userExistForSoftware) throw new ActionError("Cet utilisateur est déjà associé à ce logiciel.")
        const userHaveSoftware = await prisma.userSoftware.count({
            where: {
                userId: user.id,
            }
        })
        await prisma.userSoftware.create({
            data: {
                userId: user.id,
                isEditor,
                softwareLabel: software.label,
                softwareClientId: clientId,
                createdBy: userId,
                isActivated: userHaveSoftware ? false : true
            }
        })
    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)

    }

    revalidatePath(`/client/${clientSlug}/administrator/software/${softwareSlug}/user`)
    redirect(`/client/${clientSlug}/administrator/software/${softwareSlug}/user`)
})

export const createSoftware = authentificationActionUserIsAdminClient(SoftwaresSchema, async (values: z.infer<typeof SoftwaresSchema>, { clientId, userId, clientSlug }) => {

    const { label } = SoftwaresSchema.parse(values)
    const software = new Software('')
    const softwareExist = await software.softwareLabelExistForThisClient(label, clientId)
    if (softwareExist) throw new ActionError("Le logiciel existe déjà.")
    try {
        const soft = await software.create({
            clientId,
            label,
            userId
        })
        //Duplicate page
        const pages = await prisma.page.findMany({
            where: {
                level: 'Standard'
            }
        })
        for (const page of pages) {
            const newPage = new DynamicPage(page.slug)
            const duplicatePage = await newPage.duplicate({
                softwareLabel: soft.label,
                clientId,
                userId
            })
            const forms = await newPage.getForms()
            for (const form of forms) {
                const newForm = new Form(form.slug)
                const pageBlockId = duplicatePage?.Page_Block.find((pageBlock) => pageBlock.blockIdSource === form.blockId)?.id
                if (pageBlockId) {
                    await newForm.duplicate({
                        softwareLabel: soft.label,
                        clientId,
                        pageBlockId: pageBlockId
                    })
                }

            }

        }
        if (!soft) {
            throw new ActionError("Une erreur est survenue lors de la création du logiciel.")
        }
        await prisma.userOtherData.update({
            where: {
                userId: userId
            },
            data: {
                isSetup: true
            }
        })
    } catch (err: unknown) {

        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/editor/`)
    redirect(`/client/${clientSlug}/editor/`)
})