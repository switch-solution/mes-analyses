"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { InvitationCreateSchema } from '@/src/helpers/definition';
import { sendEmail } from '@/src/helpers/api';
import z from 'zod';
import { authentificationActionUserIsAdminClient, ActionError } from "@/lib/safe-actions";
export const createInvitation = authentificationActionUserIsAdminClient(InvitationCreateSchema, async (values: z.infer<typeof InvitationCreateSchema>, { userId, clientId }) => {
    const { civility, firstname, lastname, email, isAdministrator, isEditor, clientSlug, defaultRole, softwareLabel } = InvitationCreateSchema.parse(values)
    const emailExist = await prisma.user.findUnique({
        where: {
            email
        }

    })
    if (emailExist) {
        //Add to the client and send an email
        await prisma.userClient.create({
            data: {
                clientId,
                userId: emailExist.id,
                isBillable: isAdministrator ? true : isEditor ? true : false,
                isAdministrator,
                isEditor,
                defaultRole,
                isBlocked: false
            }
        })
        //Update software
        await prisma.userSoftware.upsert({
            where: {
                userId_softwareLabel_softwareClientId: {
                    userId: emailExist.id,
                    softwareLabel,
                    softwareClientId: clientId
                }
            },
            update: {},
            create: {
                userId: emailExist.id,
                softwareLabel,
                softwareClientId: clientId
            }

        })
        //Send an email
        const send = await sendEmail({
            method: 'POST',
            body: JSON.stringify({
                to: email,
                subject: 'Invitation to join the client',
                text: `Vous avez été invité à rejoindre le logiciel de gestion de votre cahier d'analyse paie.`,
                type: 'invitation'
            })
        })
        if (!send) {
            throw new ActionError('Error sending email')
        }



    } else {
        //Add to the invitation table and send an email
        await prisma.invitation.create({
            data: {
                clientId,
                civility,
                firstname,
                lastname,
                softwareLabel,
                email,
                isBillable: isAdministrator ? true : isEditor ? true : false,
                sendEmail: false,
                isAdministratorClient: isAdministrator,
                isEditorClient: isEditor,
                defaultRole,
                createdBy: userId
            }
        })
        const send = await sendEmail({
            method: 'POST',
            body: JSON.stringify({
                to: email,
                subject: 'Invitation to join the client',
                text: `You have been invited to join the client ${clientSlug}. Please click on the following link to accept the invitation.`,
                type: 'invitation'
            })
        })
        if (!send) {
            throw new ActionError('Error sending email')
        }
        await prisma.invitation.update({
            where: {
                email
            },
            data: {
                sendEmail: true
            }
        })
    }

    revalidatePath(`/client/${clientSlug}/administration/`);

    redirect(`/client/${clientSlug}/administration/`);

})
