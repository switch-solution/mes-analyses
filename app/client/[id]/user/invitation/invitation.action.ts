"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { InvitationSchema } from "@/src/helpers/definition"
import { getAuthSession } from '@/lib/auth';
import { userIsAdminClient } from "@/src/query/security.query";

export const createInvitation = async (formdata: FormData) => {

    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { clientId, email, firstname, lastname, civility } = InvitationSchema.parse({
        clientId: formdata.get('clientId'),
        email: formdata.get('email'),
        firstname: formdata.get('firstname'),
        lastname: formdata.get('lastname')
    })
    const isAdmin = await userIsAdminClient(userId, clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    const userExist = await prisma.user.findFirst({ where: { email: email } })
    if (userExist) {
        await prisma.userClient.create({
            data: {
                clientId,
                userId: userExist.id,
                isBlocked: false,
                isBillable: true,
                isAdministrator: false
            }
        })
    } else {
        await prisma.invitation.create({
            data: {
                clientId,
                email,
                civility,
                sendEmail: false,
                createdBy: userId,
                firstName: firstname,
                lastname: lastname
            }
        })
    }
    revalidatePath(`/client/${clientId}/user/`)
    redirect(`/client/${clientId}/user/`)

}