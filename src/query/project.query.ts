import { prisma } from "@/lib/prisma";
import { userIsAuthorizeInThisProject, userIsValid } from "./security.query";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";
import { generateSlug } from "../helpers/generateSlug";
import { b } from "vitest/dist/suite-a18diDsI.js";
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
        console.error(err)
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


/**
 * Test if the user is authorized in this project and project exist
 * @param projectSlug 
 * @returns 
 */

export const getProjectBySlug = async (projectSlug: string) => {
    try {
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

        const processusStdList = await prisma.processus.groupBy({
            by: ['id'],
            where: {
                level: "Standard"
            }
        })

        if (processusStdList.length === 0) {
            throw new Error('Aucun processus standard trouvé')
        }

        for (let processus of processusStdList) {
            //Processus is duplicated ?
            let processusToCopy = null
            let processsusSoftware = await prisma.processus.findFirst({
                where: {
                    softwareLabel: projectExist.softwareLabel,
                    clientId: projectExist.clientId,
                    isDuplicate: true,
                    idOrigin: processus.id,
                    level: "Logiciel"
                },
                include: {
                    Form: {
                        include: {
                            Form_Input: true
                        }
                    }
                }
            })
            let processsusClient = await prisma.processus.findFirst({
                where: {
                    clientId: projectExist.clientId,
                    isDuplicate: true,
                    idOrigin: processus.id,
                    level: "Client"
                },
                include: {
                    Form: {
                        include: {
                            Form_Input: true
                        }
                    }
                }
            })
            let processsus = await prisma.processus.findFirst({
                where: {
                    isDuplicate: false,
                    level: "Standard",
                    id: processus.id
                },
                include: {
                    Form: {
                        include: {
                            Form_Input: true
                        }
                    }
                }
            })
            if (processsusSoftware) {
                processusToCopy = processsusSoftware
            }

            if (processsusClient && !processsusSoftware) {
                processusToCopy = processsusClient
            }

            if (!processsusClient && !processsusSoftware) {
                processusToCopy = processsus
            }

            if (processusToCopy) {
                let countProjectProcessus = await prisma.project_Processus.count()
                const processus = await prisma.project_Processus.create({
                    data: {
                        projectLabel: projectExist.label,
                        label: processusToCopy.label,
                        description: processusToCopy.description ? processusToCopy.description : "",
                        softwareLabel: projectExist.softwareLabel,
                        clientId: projectExist.clientId,
                        table: processusToCopy.table,
                        theme: processusToCopy.theme,
                        slug: generateSlug(`Processus-${countProjectProcessus + 1}`),
                        id: processusToCopy.id
                    }
                })
                let countProjectForm = await prisma.project_Form.count()
                let countProjectInput = await prisma.project_Form_Input.count()

                const forms = processusToCopy.Form.map((form) => {
                    countProjectForm = countProjectForm + 1
                    return {
                        processusId: processus.id,
                        clientId: projectExist.clientId,
                        softwareLabel: projectExist.softwareLabel,
                        projectLabel: projectExist.label,
                        label: form.label,
                        description: form?.description ? form.description : "",
                        slug: generateSlug(`Form-${countProjectForm}`),
                        id: form.id,
                        Project_Form_Input: form.Form_Input.map((input) => {
                            countProjectInput = countProjectInput + 1
                            return {
                                label: input.label,
                                id: input.id,
                                type: input.type,
                                zodLabel: input.zodLabel,
                                minLenght: input.minLenght,
                                maxLenght: input.maxLenght,
                                min: input.min,
                                max: input.max,
                                required: input.required,
                                readOnly: input.readOnly,
                                selectTableSource: input.selectTableSource,
                                selectFieldSource: input.selectFieldSource,
                                selectOption: input.selectOption,
                                order: input.order,
                                slug: generateSlug(`FormInput-${countProjectInput}`)
                            }
                        })
                    }
                })
                for (let form of forms) {
                    await prisma.project_Form.create({
                        data: {
                            processusId: processus.id,
                            clientId: projectExist.clientId,
                            softwareLabel: projectExist.softwareLabel,
                            projectLabel: projectExist.label,
                            label: form.label,
                            description: form.description,
                            slug: form.slug,
                            id: form.id,
                            Project_Form_Input: {
                                create: form.Project_Form_Input
                            }
                        }
                    })




                }


            }


        }


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




export const getProcessusProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const projectProcessus = await prisma.project_Processus.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            },

        })

        return projectProcessus
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
        const processusExist = await prisma.project_Processus.findFirst({
            where: {
                slug: processusSlug
            }
        })
        return processusExist
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

export const getDatasForDataTable = async (projectSlug: string, processusSlug: string) => {
    try {
        const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
        if (!processusExist) {
            throw new Error('Le processus n\'existe pas')
        }
        switch (processusExist.table) {
            case "Project_DSN":

                break
            case "Project_Society":
                const societyList = await prisma.project_Society.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const society = societyList.map((society) => {
                    return {
                        id: society.siren,
                        label: society.socialReason,
                        slug: society.slug,
                        status: society.status
                    }
                })
                return society
                break
            case "Project_Establisment":
                const establishmentList = await prisma.project_Establishment.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const establishment = establishmentList.map((establishment) => {
                    return {
                        id: establishment.nic,
                        label: establishment.socialReason,
                        slug: establishment.slug,
                        status: establishment.status
                    }
                })
                return establishment
                break
            case "Project_Job":
                const jobList = await prisma.project_Job.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const job = jobList.map((job) => {
                    return {
                        id: job.id,
                        label: job.label,
                        slug: job.slug,
                        status: job.status
                    }
                })
                return job
                break
            case "Project_RateAt":
                const rateAtList = await prisma.project_Rate_AT.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const rateAt = rateAtList.map((rateAt) => {
                    return {
                        id: rateAt.id,
                        label: rateAt.label,
                        slug: rateAt.slug,
                        status: rateAt.status
                    }
                })
                return rateAt
                break
            default:
                throw new Error(`La table ${processusExist.table} n'est pas gérée`)
        }

    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des données')
    }

}

export const getProcessusActiveByProjectSlug = async ({ projectLabel, softwareLabel }: { projectLabel: string, softwareLabel: string }) => {
    try {
        const processus = await prisma.project_Processus.findFirst({
            where: {
                projectLabel,
                softwareLabel,
                isStarted: true,
                isFinished: false
            },
            orderBy: {
                id: 'asc'
            }
        })
        return processus
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des processus')
    }

}




