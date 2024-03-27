import { prisma } from "@/lib/prisma";
import { userIsAuthorizeInThisProject, userIsValid } from "./security.query";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";
import { banUser } from "./security.query";
export const getMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const validation = await getClientActiveAndSoftwareActive()
        const myProjects = await prisma.userProject.findMany({
            where: {
                userId: userId,
                isBlocked: false,
                projectSoftwareLabel: validation.softwareLabel,
                projectClientId: validation.clientId
            },
            include: {
                project: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return myProjects
    } catch (err) {
        console.log(err)
    }

}

export const getProjectTasks = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const tasks = await prisma.project_Task.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }
}

export const getUsersProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userProjects = await prisma.userProject.findMany({
            where: {
                projectLabel: projectExist.label,
                projectClientId: projectExist.clientId,
                projectSoftwareLabel: projectExist.softwareLabel
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        return userProjects
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }

}

export type getUsersProject = Prisma.PromiseReturnType<typeof getUsersProject>;

export const getUserIsInvited = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const invitation = await prisma.invitation.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId
            }
        })
        return invitation
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }
}



export const getProjectBySlug = async (projectSlug: string) => {
    try {
        await userIsAuthorizeInThisProject(projectSlug)
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                slug: projectSlug
            }
        })
        return project
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `L'utilisateur essaye d'accéder à un projet qui n'existe pas ${projectSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error('Une erreur est survenue lors de la récupération du projet')
    }
}

export const getCountMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const countMyProjects = await prisma.userProject.count({
            where: {
                userId: userId
            }
        })
        return countMyProjects
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}


export const getValidatorProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userProjectsValidator = await prisma.userProject.findMany({
            where: {
                projectLabel: projectExist.label,
                projectClientId: projectExist.clientId,
                isValidator: true
            }
        })
        return userProjectsValidator
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }
}

export const initProject = async (projectSlug: string) => {

    try {
        const projectExist = await getProjectBySlug(projectSlug)

        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        await associateProjectProcessus({
            projectLabel: projectExist.label,
            softwareLabel: projectExist.softwareLabel,
            clientId: projectExist.clientId
        })
        await associateFormProject({
            projectLabel: projectExist.label,
            softwareLabel: projectExist.softwareLabel,
            clientId: projectExist.clientId
        })
    } catch (err) {
        console.error(err)

        await prisma.project.delete({
            where: {
                slug: projectSlug,
            }
        })
        await prisma.logger.create({
            data: {
                level: "error",
                message: `Erreur lors de la création du projet ${projectSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error('Une erreur est survenue lors de l\'initialisation du projet')
    }

}

export const associateProjectProcessus = async ({
    projectLabel,
    softwareLabel,
    clientId

}: {
    projectLabel: string,
    softwareLabel: string,
    clientId: string
}) => {
    try {
        const softwareProcessus = await prisma.software_Processus.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId
            },
        })
        await prisma.project_Software_Processus.createMany({
            data: softwareProcessus.map((processus) => {
                return {
                    projectLabel: projectLabel,
                    softwareLabel: processus.softwareLabel,
                    clientId: processus.clientId,
                    processusId: processus.id,
                }
            })
        })
        const clientProcessus = await prisma.client_Processus.findMany({
            where: {
                clientId: clientId,
                id: {
                    notIn: softwareProcessus.map((processus) => processus.id)
                }
            },
        })
        await prisma.project_Client_Processus.createMany({
            data: clientProcessus.map((processus) => {
                return {
                    projectLabel: projectLabel,
                    theme: processus.theme,
                    clientId: processus.clientId,
                    processusId: processus.id,
                    softwareLabel: softwareLabel
                }
            })
        })
        const standardProcessus = await prisma.processus.findMany({
            where: {
                id: {
                    notIn: clientProcessus.map((processus) => processus.id)
                }
            },
        })
        await prisma.project_Processus.createMany({
            data: standardProcessus.map((processus) => {
                return {
                    projectLabel: projectLabel,
                    theme: processus.theme,
                    processusId: processus.id,
                    softwareLabel: softwareLabel,
                    clientId: clientId
                }
            })
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de l\'association des processus')
    }
}

export const associateFormProject = async ({
    projectLabel,
    softwareLabel,
    clientId

}: {
    projectLabel: string,
    softwareLabel: string,
    clientId: string
}) => {
    try {

        const softwareForm = await prisma.software_Form.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId
            },
        })
        await prisma.project_Software_Form.createMany({
            data: softwareForm.map((form) => {
                return {
                    projectLabel: projectLabel,
                    softwareLabel: form.softwareLabel,
                    clientId: form.clientId,
                    formId: form.id,
                    formVersion: form.version
                }
            })
        })
        const clientForm = await prisma.client_Form.findMany({
            where: {
                clientId: clientId,
                id: {
                    notIn: softwareForm.map((form) => form.id)
                }
            },
        })
        await prisma.project_Client_Form.createMany({
            data: clientForm.map((form) => {
                return {
                    projectLabel: projectLabel,
                    clientId: form.clientId,
                    formId: form.id,
                    formVersion: form.version,
                    softwareLabel: softwareLabel
                }
            })
        })
        const standardForm = await prisma.form.findMany({
            where: {
                id: {
                    notIn: softwareForm.map((form) => form.id)
                }
            },
        })
        await prisma.project_Form.createMany({
            data: standardForm.map((form) => {
                return {
                    projectLabel: projectLabel,
                    formId: form.id,
                    formVersion: form.version,
                    softwareLabel: softwareLabel,
                    clientId: clientId
                }
            })
        })
        return
    } catch (err) {

        console.error(err)
        throw new Error('Une erreur est survenue lors de la copie du projet')
    }

}

export const getProcessusProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const standardProcessus = await prisma.project_Processus.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            },
            include: {
                Processus: true
            }
        })
        const clientProcessus = await prisma.project_Client_Processus.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            },
            include: {
                Client_Processus: true
            }
        })
        const softwareProcessus = await prisma.project_Software_Processus.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            },
            include: {
                Software_Processus: true
            }
        })
        return {
            standardProcessus,
            clientProcessus,
            softwareProcessus

        }
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des processus')
    }

}

export const getProjectProcessusExist = async (projectSlug: string, processusSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const standardProcessus = await prisma.project_Processus.findFirst({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
                Processus: {
                    slug: processusSlug
                }
            },
            include: {
                Processus: true
            }

        })
        const clientProcessus = await prisma.project_Client_Processus.findFirst({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
                Client_Processus: {
                    slug: processusSlug
                }
            },
            include: {
                Client_Processus: true
            }

        })
        const softwareProcessus = await prisma.project_Software_Processus.findFirst({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
                Software_Processus: {
                    slug: processusSlug
                }
            },
            include: {
                Software_Processus: true
            }

        })
        if (!standardProcessus && !clientProcessus && !softwareProcessus) {
            throw new Error('Le processus n\'existe pas')
        }
        const processus = standardProcessus?.Processus || clientProcessus?.Client_Processus || softwareProcessus?.Software_Processus
        return processus
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des processus')
    }

}

export const getProjectSociety = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const society = await prisma.project_Society.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }

        })
        return society
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des processus')
    }

}


