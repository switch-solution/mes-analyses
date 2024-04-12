import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { FreeZoneCreateSchema, BankEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusFreeZone implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const bank = await prisma.project_Free_Zone.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return bank

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
            const { id, iban, label, slug } = BankEditSchema.parse(values)
            const bankBySlug = await prisma.project_Bank.findUnique({
                where: {
                    slug
                }
            })
            if (!bankBySlug) {
                throw new Error("La banque n'existe pas")
            }
            //update bank
            await prisma.project_Bank.update({
                where: {
                    slug
                },
                data: {
                    iban,
                    label,
                }
            })
            //add history
            const countHistory = await prisma.project_Bank_Archived.count({
                where: {
                    iban: bankBySlug.iban,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Bank_Archived.create({
                data: {
                    id: bankBySlug.id,
                    label: bankBySlug.label,
                    iban: bankBySlug.iban,
                    bic: bankBySlug.bic,
                    status: bankBySlug.status,
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
        const societyExist = await prisma.project_Bank.findFirst({
            where: {
                iban: value,
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

}