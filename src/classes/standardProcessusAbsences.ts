import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { ProjectAbsenceCreateSchema, ProjectAbsenceEditSchema } from "@/src/helpers/definition"
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusAbsence implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    processusSlug: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string, processusSlug: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
        this.processusSlug = processusSlug
    }

    async read<T>(slug: string): Promise<T> {
        const absences = await prisma.project_Absence.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return absences as T

    }
    async update({
        values,
        userId,
        projectLabel,
        softwareLabel,
        clientId
    }: {
        values: any,
        userId: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string

    }): Promise<void> {
        try {
            const { id, label, clientSlug, projectSlug, processusSlug, dsnId, method, slug, isSocialSecurity } = ProjectAbsenceEditSchema.parse(values)

            const absenceExist = await prisma.project_Absence.findUnique({
                where: {
                    slug
                }
            })

            if (!absenceExist) {
                throw new Error("L'absence n'existe pas")
            }

            //Update society
            await prisma.project_Absence.update({
                where: {
                    slug
                },
                data: {
                    id,
                    label,
                    dsnId,
                    method,
                    isSocialSecurity,
                    clientId,
                    createdBy: userId,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                }
            })

            //Add history
            const countHistory = await prisma.project_Absence_Archived.count({
                where: {
                    id: absenceExist.id,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Absence_Archived.create({
                data: {
                    id: absenceExist.id,
                    label: absenceExist.label,
                    dsnId: absenceExist.dsnId,
                    status: absenceExist.status,
                    softwareLabel: absenceExist.softwareLabel,
                    isOpen: absenceExist.isOpen,
                    isPending: absenceExist.isPending,
                    isApproved: absenceExist.isApproved,
                    method: absenceExist.method,
                    isSocialSecurity: absenceExist.isSocialSecurity,
                    clientId: absenceExist.clientId,
                    createdBy: absenceExist.createdBy,
                    projectLabel: absenceExist.projectLabel,
                    version: countHistory + 1
                }
            })

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    async valueExist({
        value,
        clientId,
        projectLabel,
        softwareLabel
    }: {
        value: string,
        clientId: string,
        projectLabel: string,
        softwareLabel: string
    }) {
        const societyExist = await prisma.project_Absence.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (societyExist) {
            return true
        }
        return false
    }
    async insert({
        values,
        userId,
        projectLabel,
        softwareLabel,
        clientId
    }: {
        values: any,
        userId: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string

    }): Promise<void> {
        try {
            const { id, clientSlug, label, description, dsnId, population, method, isSocialSecurity, settlement } = ProjectAbsenceCreateSchema.parse(values)

            const count = await prisma.project_Absence.count()
            await prisma.project_Absence.create({
                data: {
                    id,
                    dsnId,
                    method,
                    label,
                    description,
                    clientId,
                    settlement,
                    isSocialSecurity,
                    createdBy: userId,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                    slug: generateSlug(`Absence-${count + 1}`)
                }

            })
            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }


    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_Absence.delete({
                where: {
                    slug
                }
            })
            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    async dataTable() {

        const absenceList = await prisma.project_Absence.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const absences = absenceList.map((absence) => {
            return {
                id: absence.id,
                label: absence.label,
                slug: absence.slug,
                status: absence.status,
            }
        })
        return absences

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {

            throw new Error("Method not implemented.")

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    async approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string }): Promise<void> {
        try {
            const projectExist = await prisma.project.findUniqueOrThrow({
                where: {
                    slug: projectSlug
                }
            })
            const processusExist = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: processusSlug
                }
            })
            try {
                await prisma.project_Processus.update({
                    where: {
                        clientId_projectLabel_softwareLabel_id_version: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            id: processusExist.id,
                            version: processusExist.version
                        }
                    },
                    data: {
                        isOpen: false,
                        isProgress: true
                    }
                })
            } catch (err) {
                console.error(err)
                throw new Error('Erreur lors du passage du processus sur isProgress')
            }
            try {
                //Update record to is pending
                await prisma.project_Absence.updateMany({
                    where: {
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        clientId: projectExist.clientId

                    },
                    data: {
                        isOpen: false,
                        isPending: true
                    }
                })
            } catch (err) {
                console.error(err)
                throw new Error('Erreur lors de la mise à jour des DSN')
            }


            const userValidator = await prisma.userProject.findMany({
                where: {
                    projectClientId: projectExist.clientId,
                    projectLabel: projectExist.label,
                    projectSoftwareLabel: projectExist.softwareLabel,
                    isValidator: true
                },
                include: {
                    project: {
                        include: {
                            Project_Absence: {
                                select: {
                                    slug: true,
                                    label: true
                                }
                            }
                        }
                    }
                }
            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Absence.map((absence) => {
                        return {
                            userId: user.userId,
                            rowSlug: absence.slug,
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            processusSlug: processusExist.slug,
                            projectSlug: projectSlug,
                            clientSlug: clientSlug,
                            label: absence.label,
                            theme: 'Absence',
                            description: 'Validation de l\'absence',
                        }
                    })
                )


            }).flat(1)
            await prisma.project_Approve.createMany({
                data: validationRow

            })

            const nextProcessus = processusExist.order + 1
            const nextProcessusExist = await prisma.project_Processus.findFirst({
                where: {
                    clientId: projectExist.clientId,
                    projectLabel: projectExist.label,
                    softwareLabel: projectExist.softwareLabel,
                    order: nextProcessus
                },
            })
            if (nextProcessusExist) {
                await prisma.project_Processus.update({
                    where: {
                        clientId_projectLabel_softwareLabel_id_version: {
                            clientId: nextProcessusExist.clientId,
                            projectLabel: nextProcessusExist.projectLabel,
                            softwareLabel: nextProcessusExist.softwareLabel,
                            id: nextProcessusExist.id,
                            version: nextProcessusExist.version
                        }

                    },
                    data: {
                        isOpen: true,
                        isPending: false
                    }
                })

            }

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la validation du processus')
        }

    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const absences = await prisma.project_Absence.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Absence_Archived: true
                }
            })
            const datas = absences.map((absence) => {
                return {
                    id: absence.id,
                    label: absence.label,
                    description: absence.description,
                    dsnId: absence.dsnId,
                    population: absence.population,
                    method: absence.method,
                    isSocialSecurity: absence.isSocialSecurity,
                    status: absence.status,
                    createdAt: absence.createdAt,
                    updatedAt: absence.updatedAt
                }
            })

            const archived = absences.map((absence) => {
                return absence.Project_Absence_Archived.map((archived) => {
                    return {
                        id: archived.id,
                        label: archived.label,
                        description: archived.description,
                        dsnId: archived.dsnId,
                        population: archived.population,
                        method: archived.method,
                        isSocialSecurity: archived.isSocialSecurity,
                        status: archived.status,
                        createdAt: archived.createdAt,
                        updatedAt: archived.updatedAt
                    }
                })

            }).flat(1)


            const inputsList = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: this.processusSlug,
                },
                include: {
                    Form: {
                        where: {
                            isCreate: true,

                        },
                        include: {
                            Form_Input: {
                                select: {
                                    zodLabel: true,
                                    label: true
                                }
                            }
                        }
                    }
                }
            })
            const inputs = inputsList.Form.map((form) => {
                return form.Form_Input.map((input) => {
                    return {
                        zodLabel: input.zodLabel,
                        label: input.label
                    }
                })
            }).flat(1)
            const extractions = {
                datas: datas,
                archived: archived,
                inputs: inputs
            }

            return extractions
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }

}