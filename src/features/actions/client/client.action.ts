"use server";
import crypto from 'crypto';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ClientEditFormSchema, CreateApiKeysSchema } from "@/src/helpers/definition";
import { getClientSirenBySlug } from '@/src/query/client.query';
import z from 'zod';
import { ActionError, authentificationActionUserIsAdminClient } from "@/lib/safe-actions"
import { Logger } from '@/src/helpers/type';
import { createLog } from '@/src/query/logger.query';
export const editClient = authentificationActionUserIsAdminClient(ClientEditFormSchema, async (values: z.infer<typeof ClientEditFormSchema>, { clientId, userId }) => {
    const { clientSlug, socialReason } = ClientEditFormSchema.parse(values)
    try {
        const siren = await getClientSirenBySlug(clientSlug)
        if (!siren) throw new ActionError("Le client n'existe pas.")
        await prisma.client.update({
            where: {
                siren
            },
            data: {
                socialReason: socialReason,
                siren: siren,
            }
        })
        const log: Logger = {
            level: "info",
            message: `Le client ${clientSlug} a été modifié.`,
            scope: "client",
            clientId
        }

        await createLog(log)
    } catch (err: unknown) {
        console.error(err)
        throw new Error(err as string)
    }


    revalidatePath(`/client/${clientSlug}/administration/`);
    redirect(`/client/${clientSlug}/administration/`);

})

export const createApiKey = authentificationActionUserIsAdminClient(CreateApiKeysSchema, async (values: z.infer<typeof CreateApiKeysSchema>, { clientId, userId }) => {
    const { clientSlug, label, limit } = CreateApiKeysSchema.parse(values)
    try {
        const countApi = await prisma.client_API.count()
        await prisma.client_API.create({
            data: {
                clientId,
                apiKey: crypto.randomBytes(32).toString('hex'),
                label: label,
                limit: limit,
                slug: `api-${countApi + 1}`
            }

        })
        await createLog({
            level: "warning",
            message: `Une nouvelle clé API a été créée pour le client `,
            scope: "client",
            clientId: clientId
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de la clé API.")
    }


    revalidatePath(`/client/${clientSlug}/administration/api`);
    redirect(`/client/${clientSlug}/administration/api`);



})
