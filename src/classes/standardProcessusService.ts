import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateServiceSchema, EditServiceSchema } from "@/src/helpers/definition"
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusService implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const service = await prisma.project_Service.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return service

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
            const countHistory = await prisma.project_Service.count({
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
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string }): void {
        throw new Error("Method not implemented.")
    }

}