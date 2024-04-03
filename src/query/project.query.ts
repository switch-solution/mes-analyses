import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";
import { generateSlug } from "../helpers/generateSlug";
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

export const initProject = async ({
    projectLabel,
    softwareLabel,
    clientId
}: {
    projectLabel: string,
    softwareLabel: string,
    clientId: string
}) => {

    try {

        const processusOrderStdList = await prisma.processus_Order.findMany({
            include: {
                Processus: {
                    include: {
                        Form: {
                            include: {
                                Form_Input: true
                            }
                        }
                    }
                }
            }
        })

        const processusIdList = await prisma.processus.groupBy({
            by: ['id']
        })

        //Copy processus order
        let countProjectProcessusOrder = await prisma.project_Processus_Order.count()
        const projectProcessusOrder = processusOrderStdList.map((processus) => {
            countProjectProcessusOrder = countProjectProcessusOrder + 1
            return {
                id: processus.id,
                label: processus.label,
                order: processus.order,
                clientId,
                softwareLabel,
                projectLabel,
                slug: generateSlug(`Processus-order-${countProjectProcessusOrder}`),

            }
        })

        await prisma.project_Processus_Order.createMany({
            data: projectProcessusOrder
        })

        //Copy Processus
        let countProjectProcessus = await prisma.project_Processus.count()
        const processus = processusOrderStdList.map((processus) => {
            return (
                processus.Processus.map((processus) => {
                    countProjectProcessus = countProjectProcessus + 1
                    return {
                        id: processus.id,
                        label: processus.label,
                        clientId,
                        softwareLabel,
                        description: processus.description,
                        orderId: processus.orderId,
                        projectLabel,
                        table: processus.table,
                        slug: generateSlug(`Processus-${countProjectProcessus}`)
                    }
                })
            )

        }).flat(1)
        await prisma.project_Processus.createMany({
            data: processus
        })


        //Copy form
        let countProjectForm = await prisma.project_Form.count()
        const formList = processusOrderStdList.map((processus) => {
            return (
                processus.Processus.map((processus) => {
                    return (processus.Form.map((form) => {
                        countProjectForm = countProjectForm + 1
                        return {
                            id: form.id,
                            label: form.label,
                            clientId,
                            softwareLabel,
                            projectLabel,
                            processusId: form.processusId,
                            description: form.description,
                            slug: generateSlug(`Form-${countProjectForm}`),

                        }
                    }))
                })
            )
        }).flat(2)
        await prisma.project_Form.createMany({
            data: formList
        })

        let countProjectFormInput = await prisma.project_Form_Input.count()

        const inputsList = processusOrderStdList.map((processus) => {
            return (
                processus.Processus.map((processus) => {
                    return (processus.Form.map((form) => {
                        return (form.Form_Input.map((input) => {
                            countProjectFormInput = countProjectFormInput + 1
                            return {
                                id: input.id,
                                label: input.label,
                                clientId,
                                softwareLabel,
                                projectLabel,
                                zodLabel: input.zodLabel,
                                formId: input.formId,
                                slug: generateSlug(`Input-${countProjectFormInput}`),
                                type: input.type,
                                required: input.required,
                                order: input.order,
                                maxLenght: input.maxLenght,
                                minLenght: input.minLenght,
                                max: input.max,
                                min: input.min,
                                readOnly: input.readOnly,
                                defaultValue: input.defaultValue,
                                selectOption: input.selectOption,
                                selectTableSource: input.selectTableSource,
                                selectFieldSource: input.selectFieldSource,
                            }
                        }))
                    }))
                })
            )
        }).flat(3)

        await prisma.project_Form_Input.createMany({
            data: inputsList
        })

        await prisma.project_Processus_Order.update({
            where: {
                id_clientId_softwareLabel_projectLabel: {
                    id: 'Processus_0001',
                    clientId,
                    softwareLabel,
                    projectLabel
                }
            },
            data: {
                inProgress: true
            }
        })

    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `Erreur lors de la création du projet ${projectLabel} ${softwareLabel} ${clientId}`,
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
                clientId: projectExist.clientId,
                Project_Processus_Order: {
                    inProgress: true
                }
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
                const dsnList = await prisma.project_DSN.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId,
                    }
                })
                const dsn = dsnList.map((dsn) => {
                    return {
                        id: dsn.dsnSiret,
                        label: dsn.dsnDate,
                        slug: dsn.random,
                        status: 'Intégré',
                        table: processusExist.table
                    }
                })
                return dsn
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
                        status: society.status,
                        table: processusExist.table
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
                        status: establishment.status,
                        table: processusExist.table
                    }
                })
                return establishment
                break
            case "Project_Job":
                const jobList = await prisma.project_Job.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId,
                    }
                })
                const job = jobList.map((job) => {
                    return {
                        id: job.id,
                        label: job.label,
                        slug: job.slug,
                        status: job.status,
                        table: processusExist.table
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
                        status: rateAt.status,
                        table: processusExist.table
                    }
                })
                return rateAt
                break
            case "Project_OPS":
                const opsList = await prisma.project_OPS.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const ops = opsList.map((ops) => {
                    return {
                        id: ops.type,
                        label: ops.label,
                        slug: ops.slug,
                        status: ops.status,
                        table: processusExist.table
                    }
                })
                return ops
                break
            case "Project_Idcc":
                const idccList = await prisma.project_Idcc.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const idcc = idccList.map((idcc) => {
                    return {
                        id: idcc.idcc,
                        label: idcc.label,
                        slug: idcc.slug,
                        status: idcc.status,
                        table: processusExist.table
                    }
                })
                return idcc
                break
            case "Project_Classification":
                const classificationList = await prisma.project_Classification.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const classification = classificationList.map((classification) => {
                    return {
                        id: classification.id,
                        label: classification.label,
                        slug: classification.slug,
                        status: classification.status,
                        table: processusExist.table
                    }
                })
                return classification
                break
            case "Project_Paid_Leave":
                const paidLeaveList = await prisma.project_Paid_Leave.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    },
                    include: {
                        Project_Establishment: true
                    }
                })
                const paidLeave = paidLeaveList.map((paidLeave) => {
                    return {
                        id: paidLeave.establishmentNic,
                        label: paidLeave.Project_Establishment.socialReason,
                        slug: paidLeave.slug,
                        status: paidLeave.status,
                        table: processusExist.table
                    }
                })
                break
            case "Project_Absence":
                const absenceList = await prisma.project_Absence.findMany({
                    where: {
                        projectLabel: processusExist.projectLabel,
                        softwareLabel: processusExist.softwareLabel,
                        clientId: processusExist.clientId
                    }
                })
                const absence = absenceList.map((absence) => {
                    return {
                        id: absence.id,
                        label: absence.label,
                        slug: absence.slug,
                        status: absence.status,
                        table: processusExist.table
                    }
                })
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
        const processus = await prisma.project_Processus_Order.findFirst({
            where: {
                projectLabel,
                softwareLabel,
                inProgress: true
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




