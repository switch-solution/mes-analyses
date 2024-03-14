"use server";

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ClientEditFormSchema } from "@/src/helpers/definition";
import { getClientSirenBySlug } from '@/src/query/client.query';
import z from 'zod';
import { ActionError, authentificationActionUserIsAdminClient } from "@/lib/safe-actions"
import { Logger } from '@/src/helpers/type';
import { createLog } from '@/src/query/logger.query';

export const editClient = authentificationActionUserIsAdminClient(ClientEditFormSchema, async (values: z.infer<typeof ClientEditFormSchema>, { clientId, userId }) => {
    const { clientSlug, ape, address1, address2, address3, address4, city, codeZip, country, socialReason } = ClientEditFormSchema.parse(values)
    try {
        const siren = await getClientSirenBySlug(clientSlug)
        if (!siren) throw new ActionError("Le client n'existe pas.")
        await prisma.client.update({
            where: {
                siren
            },
            data: {
                socialReason: socialReason,
                ape: ape,
                address1: address1,
                address2: address2,
                address3: address3,
                address4: address4,
                city: city,
                codeZip: codeZip,
                country: country,
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


    revalidatePath(`/client/${clientSlug}/administrator/`);
    redirect(`/client/${clientSlug}/administrator/`);

})