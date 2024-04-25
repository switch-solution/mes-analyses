import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { FreeZoneCreateSchema, FreeZoneEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusFreeZone implements IProcessus {
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
        const free = await prisma.project_Free_Zone.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return free as T

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
            const { label, description, slug, id } = FreeZoneEditSchema.parse(values)
            const freeZoneSlug = await prisma.project_Free_Zone.findUnique({
                where: {
                    slug
                }
            })
            if (!freeZoneSlug) {
                throw new Error("La zone libre n'existe pas")
            }
            //update bank
            await prisma.project_Free_Zone.update({
                where: {
                    slug
                },
                data: {
                    description,
                    label,
                }
            })
            //add history
            const countHistory = await prisma.project_Free_Zone_Archived.count({
                where: {
                    id,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            console.log(countHistory)
            await prisma.project_Free_Zone_Archived.create({
                data: {
                    label,
                    description,
                    id: freeZoneSlug.id,
                    type: freeZoneSlug.type,
                    status: freeZoneSlug.status,
                    isOpen: freeZoneSlug.isOpen,
                    isPending: freeZoneSlug.isPending,
                    isApproved: freeZoneSlug.isApproved,
                    version: countHistory + 1,
                    clientId,
                    createdBy: userId,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
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
        const freeZoneExist = await prisma.project_Free_Zone.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (freeZoneExist) {
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
            const { id, label, description, clientSlug, processusSlug, type } = FreeZoneCreateSchema.parse(values)

            const freeZoneExist = await prisma.project_Free_Zone.findFirst({
                where: {
                    type,
                    id,
                    label,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (freeZoneExist) {
                throw new Error("La zone libre existe déjà")
            }
            try {
                const count = await prisma.project_Free_Zone.count()
                await prisma.project_Free_Zone.create({
                    data: {
                        id,
                        label,
                        type,
                        description,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Free-zone-${count + 1}`)
                    }

                })
            } catch (err: unknown) {
                console.error(err)
                throw new Error(err as string)
            }

            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }


    }
    parentElement(slug: string): Promise<{ id: string; label: string; slug: string; status: string; type: string; }[]> {
        throw new Error("Method not implemented.")
    }
    async delete(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async dataTable() {

        const freeZoneList = await prisma.project_Free_Zone.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const free = freeZoneList.map((free) => {
            return {
                id: free.type,
                label: free.label,
                slug: free.slug,
                status: free.status,
            }
        })
        return free

    }
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[]; archived: {}[]; inputs: { zodLabel: string; label: string }[] }> {
        try {
            throw new Error("Method not implemented.")
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'extraction')
        }
    }

}