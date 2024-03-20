"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserCreateSchema, UserEditSchema } from '@/src/helpers/definition';
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { createLog } from "@/src/query/logger.query";
import { apiFetch } from "@/src/helpers/api";
import { ActionError, authentifcationAction, authentificationActionUserIsAdminClient } from "@/lib/safe-actions";
export const createUser = authentificationActionUserIsAdminClient(UserCreateSchema, async (values: z.infer<typeof UserCreateSchema>, { clientId, userId }) => {

    const { email, firstname, lastname, civility, clientSlug } = UserCreateSchema.parse(values)
    const userInvitationExistInThisClient = await prisma.invitation.findFirst({
        where: {
            email,
            clientId
        }
    })
    if (userInvitationExistInThisClient) {
        throw new ActionError("Cet utilisateur a déjà été invité")
    }

    try {
        await prisma.invitation.create({
            data: {
                email,
                firstname,
                lastname,
                civility,
                clientId,
                createdBy: userId,
                sendEmail: false,
                isBillable: true,
                source: "Client"
            }
        })
        const log: Logger = {
            level: "info",
            scope: "user",
            message: `L'utilisateur ${email} a été créé invité`
        }
        await createLog(log)

        await apiFetch(`/api/send`, {
            method: "POST", body: JSON.stringify({
                email,
                firstname,
                lastname,
                civility,
                clientLabel: 'test',
                subject: 'Invitation à rejoindre le client',
            })
        })

        await prisma.invitation.update({
            where: {
                email,
                firstname,
                lastname,
                civility,
                clientId,
                createdBy: userId,
                sendEmail: false,
                isBillable: true,
                source: "Client"
            },
            data: {
                sendEmail: true
            }

        })

    } catch (err: unknown) {
        console.error(err)
        await prisma.invitation.delete({
            where: {
                email,
                firstname,
                lastname,
                civility,
                clientId,
                createdBy: userId,
                sendEmail: false,
                isBillable: true,
                source: "Client"
            }
        })
        const log: Logger = {
            level: "info",
            scope: "user",
            message: `Suppression de l'invitation à  ${email} `
        }
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/administrator/user`)
    redirect(`/client/${clientSlug}/administrator/user`)

})

export const editUser = authentifcationAction(UserEditSchema, async (values: z.infer<typeof UserEditSchema>, userId) => {
    const { firstname, lastname, civility } = UserEditSchema.parse(values)
    try {
        await prisma.userOtherData.update({
            where: {
                userId
            },
            data: {
                firstname,
                lastname,
                civility
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/profil`)
    redirect(`/profil`)

})