"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { InvitationProjectSchema } from "@/src/helpers/definition"
import z from "zod";
import { getUserByEmail } from "@/src/query/user.query";
import { authentifcationActionUserIsAuthorizeToAdminProject, ActionError } from "@/lib/safe-actions";
import { getClientBySlug } from "@/src/query/client.query";
import { getProjectBySlug } from "@/src/query/project.query";
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
export const createInvitationProject = authentifcationActionUserIsAuthorizeToAdminProject(InvitationProjectSchema, async (values: z.infer<typeof InvitationProjectSchema>, { clientId, userId }) => {

    const { clientSlug, civility, lastname, firstname, email, projectSlug, isAdministratorProject, isValidatorProject, isEditorProject } = InvitationProjectSchema.parse(values)

    const clientExist = await getClientBySlug(clientSlug)
    if (!clientExist) throw new ActionError("Client not found")
    const projectExist = await getProjectBySlug(projectSlug)
    if (!projectExist) throw new ActionError("Project not found")
    const userExist = await getUserByEmail(email)
    const userExistInProject = await prisma.userProject.findFirst({
        where: {
            userId: userExist?.id,
            projectLabel: projectExist.label,
            projectSoftwareLabel: projectExist.softwareLabel,
            projectClientId: clientExist.siren
        }
    })
    if (userExistInProject) throw new ActionError("Utilisateur déjà présent sur le projet")



    if (userExist) {
        await prisma.userProject.create({
            data: {
                userId: userExist.id,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                projectClientId: clientExist.siren,
                isAdmin: isAdministratorProject,
                isEditor: isEditorProject,
                isValidator: isValidatorProject,
                createdBy: userId
            }

        })
        const log: Logger = {
            level: "warning",
            scope: "invitation",
            message: `Utilisateur ${userExist.email} a été ajouté sur le projet`,
            clientId,
            projectLabel: projectExist.label,
            projectSoftwareLabel: projectExist.softwareLabel,

        }
        await createLog(log)
    } else {
        //L'utilisateur n'existe pas on doit donc lui envoyer un email pour qu'il puisse s'inscrire
        //Fonctionnalité à venir

        await prisma.invitation.create({
            data: {
                email,
                sendEmail: false,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: clientExist.siren,
                createdBy: userId,
                source: "project",
                civility,
                lastname,
                firstname
            }

        })

        const logCreateUser: Logger = {
            level: "warning",
            scope: "invitation",
            message: `Utilisateur ${lastname} ${firstname} a été invité à rejoindre client`,
            clientId,
            projectLabel: projectExist.label,
            projectSoftwareLabel: projectExist.softwareLabel,

        }
        await createLog(logCreateUser)

        await prisma.project_Invitation.create({
            data: {
                email,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: clientExist.siren,
                isAdministrator: isAdministratorProject,
                isEditor: isEditorProject,
                isValidator: isValidatorProject,
                createdBy: userId
            }
        })

        const log: Logger = {
            level: "warning",
            scope: "invitation",
            message: `Utilisateur ${lastname} ${firstname} a été invité à rejoindre le projet`,
            clientId,
            projectLabel: projectExist.label,
            projectSoftwareLabel: projectExist.softwareLabel,

        }
        await createLog(log)


    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/user/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/user/`)

})