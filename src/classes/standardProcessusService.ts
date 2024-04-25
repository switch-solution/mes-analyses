import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateServiceSchema, EditServiceSchema } from "@/src/helpers/definition"
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusService implements IProcessus {
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
        const service = await prisma.project_Service.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return service as T

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
            const { id, slug, clientSlug, projectSlug, processusSlug, label, level, description, highterLevel } = EditServiceSchema.parse(values)

            const serviceBySlug = await prisma.project_Service.findUnique({
                where: {
                    slug
                }
            })

            if (!serviceBySlug) {
                throw new Error("La société n'existe pas")
            }


            //Update service
            await prisma.project_Service.update({
                where: {
                    slug
                },
                data: {
                    id,
                    label,
                    level,
                    description,
                    highterLevel,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                }
            })

            //Add history
            const countHistory = await prisma.project_Service_Archieved.count({
                where: {
                    id: serviceBySlug.id,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Service_Archieved.create({
                data: {
                    id: serviceBySlug.id,
                    label: serviceBySlug.label,
                    level: serviceBySlug.level,
                    description: serviceBySlug.description,
                    highterLevel: serviceBySlug.highterLevel,
                    projectLabel: projectLabel,
                    status: serviceBySlug.status,
                    softwareLabel: softwareLabel,
                    clientId: clientId,
                    createdBy: serviceBySlug.createdBy,
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
        const serviceExist = await prisma.project_Service.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (serviceExist) {
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
            const { id, label, highterLevel, level, clientSlug, projectSlug, processusSlug } = CreateServiceSchema.parse(values)
            const serviceExist = await prisma.project_Service.findFirst({
                where: {
                    id,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (serviceExist) {
                throw new Error("Le servuce existe déjà")
            }

            const count = await prisma.project_Service.count()
            await prisma.project_Service.create({
                data: {
                    id,
                    label,
                    highterLevel,
                    level,
                    clientId,
                    createdBy: userId,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                    slug: generateSlug(`Service-${count + 1}`)
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
            await prisma.project_Service.delete({
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

        const servicesList = await prisma.project_Service.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const services = servicesList.map((service) => {
            return {
                id: service.id,
                label: service.label,
                slug: service.slug,
                status: service.status,
            }
        })
        return services

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const societyDatabase = await prisma.project_Service.findUniqueOrThrow({
                where: {
                    slug
                },
                select: {
                    id: true,
                    label: true,
                    status: true,
                    slug: true
                }
            })

            const society = {
                id: societyDatabase.id,
                label: societyDatabase.label,
                slug: societyDatabase.slug,
                status: societyDatabase.status,
                type: 'Service'
            }


            const elements = []
            elements.push(society)

            return elements
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
                await prisma.project_Service.updateMany({
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
                            Project_Service: {
                                select: {
                                    slug: true,
                                    id: true,
                                    label: true
                                }
                            }
                        }
                    }
                }
            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Service.map((service) => {
                        return {
                            userId: user.userId,
                            rowSlug: service.slug,
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            processusSlug: processusExist.slug,
                            projectSlug: projectSlug,
                            clientSlug: clientSlug,
                            label: service.label,
                            theme: 'Service',
                            description: 'Validation des services',
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
            const serviceList = await prisma.project_Service.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Service_Archieved: true
                }
            })
            const datas = serviceList.map((service) => {
                return {
                    id: service.id,
                    label: service.label,
                    level: service.level,
                    description: service.description,
                    highterLevel: service.highterLevel,
                    status: service.status,
                    createdAt: service.createdAt,
                    updatedAt: service.updatedAt
                }
            })

            const archived = serviceList.map((service) => {
                return service.Project_Service_Archieved.map((archived) => {
                    return {
                        id: archived.id,
                        label: archived.label,
                        level: archived.level,
                        description: archived.description,
                        highterLevel: archived.highterLevel,
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