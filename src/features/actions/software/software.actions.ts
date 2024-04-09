"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwaresSchema, CreateUserSoftwareSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { generateSlug } from "@/src/helpers/generateSlug"
import { getClientSirenBySlug } from "@/src/query/client.query";
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

export const createSoftware = authentificationActionUserIsAdminClient(SoftwaresSchema, async (values: z.infer<typeof SoftwaresSchema>, { clientId, userId }) => {

    const { label, clientSlug } = SoftwaresSchema.parse(values)
    const slug = generateSlug(`${clientSlug}-${label}`)
    try {
        const softwareExist = await prisma.software.findFirst({
            where: {
                label,
                clientId
            }
        })
        if (softwareExist) {
            const log: Logger = {
                level: "error",
                message: `Erreur lors de la création du logiciel ${label} `,
                scope: "software",
                clientId: clientId,
            }
            await createLog(log)
            throw new ActionError("Ce logiciel existe déjà.")
        }
        await prisma.userSoftware.updateMany({
            where: {
                userId: userId
            },
            data: {
                isActivated: false
            }
        })
        await prisma.software.create({
            data: {
                label,
                slug,
                clientId: clientId,
                createdBy: userId,
                UserSoftware: {
                    create: {
                        userId,
                        isEditor: true,
                        isActivated: true
                    }

                }
            }
        })
        //Move to new default software


        const defaultSetting = await prisma.default_Setting.findMany()
        let countSetting = await prisma.software_Setting.count()
        const softwareSetting = defaultSetting.map(setting => {
            countSetting = countSetting + 1
            return {
                id: setting.id,
                label: setting.label,
                description: setting.description,
                value: setting.value,
                softwareLabel: label,
                clientId: clientId,
                createdBy: userId,
                slug: generateSlug(`setting-${countSetting}`)
            }

        })
        await prisma.software_Setting.createMany({
            data: softwareSetting
        })

        const log: Logger = {
            level: "info",
            message: `Le logiciel ${label} a été ajouté`,
            scope: "software",
            clientId: clientId,
        }

        await createLog(log)
    } catch (err: unknown) {

        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/editor/`)
    redirect(`/client/${clientSlug}/editor/`)
})